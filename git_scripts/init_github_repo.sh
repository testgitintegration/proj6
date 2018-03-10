#!/bin/sh
echo "# " + awevsum-repo-v2-nr3.git >> README.md
git init
git add README.md
git commit -m "first commit"
#git remote add origin https://github.com/testgitintegration/awevsum-repo1000.git
git remote add origin https://github.com/testgitintegration/awevsum-repo-v2-nr3.git
git push -u origin master
exit
