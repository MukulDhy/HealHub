const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const executePython = require("../utils/excutePython");
const axios = require("axios");
const ImageUpload = require("../models/imageModel");
const Result = require("../models/resultModel");

const gangereneDetection = catchAsyncError(async (req, res) => {
  try {
    const imageId = req.body.imageId || req.params._id;
    const image = await ImageUpload.findById(imageId);
    const imagePath = image.path.replace(/\\/g, "/");
    const resultImagePath =
      "backend/image/result/" +
      imagePath.split("/").pop().split(".")[0] +
      "_predication.png";
    const response = await executePython("python/PRED DETECTION.PY", [
      imagePath,
      "backend/image/result/",
      imagePath.split("/").pop().split(".")[0],
    ]);

    const result = convertStringToArrayOfObjects(response);

    if (!result) {
      throw new ErrorHandler(
        "Failed to Get Predication || Try out with another image",
        400
      );
    }

    const cleanedData = result.map(
      ({
        class_confidence,
        class_id,
        tracker_id,
        image_path,
        prediction_type,
        ...cleanedItem
      }) => cleanedItem
    );

    const resultImage = await Result.create({
      user: req.user._id,
      prediction: cleanedData,
      description: response,
      resultImagePath: resultImagePath || "Not Result Image",
      orgImage: image._id,
    });

    await resultImage.save();
    await ImageUpload.findByIdAndUpdate(imageId, { result: resultImage._id });

    res.status(200).json({
      success: true,
      result: result,
      orgResponse: response,
      resultImage: resultImage.resultImagePath,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

function convertStringToArrayOfObjects(inputString) {
  inputString = inputString.slice(
    inputString.indexOf("[") + 1,
    inputString.lastIndexOf("]")
  );
  let jsonString = "[" + inputString + "]";
  jsonString = jsonString.replace(/'/g, '"');
  jsonString = jsonString.replace(/\bNone\b/g, "null");
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

module.exports = {
  gangereneDetection,
};
