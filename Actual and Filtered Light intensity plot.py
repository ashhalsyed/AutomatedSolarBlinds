import matplotlib.pyplot as plt
from scipy.signal import savgol_filter

values = [79, 142, 103, 105, 128, 112, 158, 142, 165, 228, 159, 172, 199, 196, 207, 266, 268, 257, 251, 220, 281,
          290, 241, 277, 240, 294, 306, 251, 256, 249, 287, 282, 251, 287, 353, 271, 211, 205, 206, 208, 144, 176, 183, 165, 141, 112]

yhat = savgol_filter(values, 40, 3)  # window size 51, polynomial order 3

plt.plot(values, label='actual values')
plt.plot(yhat, color='red', label='approximated curve')
plt.ylabel('Light Intensity')
plt.xlabel('(Sweep angle)/2')
plt.legend(loc="upper left")
plt.show()
