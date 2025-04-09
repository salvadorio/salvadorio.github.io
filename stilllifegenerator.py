import cv2


import numpy as np
import random
import pandas as pd
from scipy import spatial
from sklearn.cluster import KMeans
import math
from sklearn import cluster
import os
import scipy.interpolate as si



image = cv2.imread("/Users/work/Desktop/NYU_WORK/web/salvadorio.github.io/imgs/sam.png")


image = cv2.bilateralFilter(image,9,75,75)

height, width, channels = image.shape

# canvas = np.zeros(image.shape, np.uint8)
# Z = image.reshape((-1,3))
# # convert to np.float32
# Z = np.float32(Z)
# # define criteria, number of clusters(K) and apply kmeans()
# criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
# K = 15


# colors = [[0] * 3] * K
# blobs = [None] * K

# ret,label,center=cv2.kmeans(Z,K,None,criteria,10,cv2.KMEANS_RANDOM_CENTERS)
# # Now convert back into uint8, and make original image
# center = np.uint8(center)
# res = center[label.flatten()]
# res2 = res.reshape((image.shape))


# img_grey = cv2.cvtColor(res2,cv2.COLOR_BGR2GRAY)


# edged = cv2.Canny(img_grey, 20, 45)


# contours, hierarchy = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)



# for cnt in contours:
  
#     epsilon = 0.05*cv2.arcLength(cnt,True)
#     approx = cv2.approxPolyDP(cnt,epsilon,True)
#     hull = cv2.convexHull(cnt)
#     if (cv2.contourArea(hull) > 100):
#        npcnt = np.vstack(cnt).squeeze()
#        clustercount = max(int(cv2.contourArea(hull) / 1000) + 1, 1)
#        #if clustercount > 1:
#            #cv2.drawContours(canvas, [hull] ,0,(0, 0, 255), 1)
#            # should probably put all the clustering logic here so we aren't running that unnecessarily.
#        kmeans = KMeans(n_clusters=clustercount, n_init = 'auto')


#        spectral = cluster.SpectralClustering(
#        n_clusters= clustercount,
#        eigen_solver="arpack",
#        affinity="nearest_neighbors")
      
#        kmeans.fit(npcnt)
#        #spectral.fit(npcnt)
#        data_labels = kmeans.labels_


#        index = pd.Index(data_labels, name='label')
#        df = pd.DataFrame(npcnt, index=index)
#        groups = [v.values for k, v in df.groupby('label')]
  
#        for group in groups:
#            hull = cv2.convexHull(group)


#            M = cv2.moments(hull)
#            cx = int(M['m10']/M['m00'])
#            cy = int(M['m01']/M['m00'])
#            #cv2.circle(canvas, (cx, cy), 1, (255, 255, 255), 1)
#            color = (res2[cy, cx])
#            b = int(color[0])
#            g = int(color[1])
#            r = int(color[2])
#            cv2.drawContours(canvas, [hull] ,0,(b,g,r), cv2.FILLED)



        




image = cv2.resize(image,(int(width/10), int(height/10)), interpolation=cv2.INTER_AREA)
height, width, channels = image.shape
with open("output.txt", "w") as file:
    for i in range(0, height):
        for j in range(0, width):
            bgr = image[i,j]
            rgb = bgr[::-1]
            hex_color = '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])


            file.write(f"<div style='position:absolute; top:{i * 10}px; left: {j * 10}px; width:10px; height:10px; background-color: {hex_color}; z-index: 10;'></div>")

    image = cv2.imread("/Users/work/Desktop/NYU_WORK/web/salvadorio.github.io/imgs/focusstill.png")
    height, width, channels = image.shape

    for i in range(1000):
        x = random.randint(0,width-1)
        y = random.randint(0,height-1)
        bgr = image[y,x]
        rgb = bgr[::-1]
        hex_color = '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

        file.write(f"<div style='position:absolute; top:{y}px; left: {x}px; width:10px; height:10px; background-color: {hex_color}; z-index: 10;'></div>")



cv2.imshow("img", canvas)
cv2.waitKey(0)
cv2.destroyAllWindows()

