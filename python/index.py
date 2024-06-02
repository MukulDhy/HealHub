import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import linear_regression
np.random.seed(0)
X = np.random.rand(50,1)
Y = 2*X+1+np.random.rand(50,1)
model = linear_regression()
model.fit(X,Y)
plt.scatter(X,Y)
plt.plot(X,model.predict(X),color= 'red')
plt.show()
 
