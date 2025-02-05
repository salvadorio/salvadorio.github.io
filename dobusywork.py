from os import listdir
from os.path import isfile, join


mypath = "/Users/work/Desktop/NYU WORK/web/salvadorio.github.io/imgs/projectPreviewImg"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

print(onlyfiles)
