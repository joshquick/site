From website folder:
;
To pull changes to site and to submodules (but not recurse into them):
```
git pull
git submodule update --remote
```

To commit changes to files artic-ebov/docs:

```
cd pages/artic-ebov/

git add docs/

git commit -m "message"

git push origin HEAD:master

cd ../..
```

Commit the changes to the site repo:
```
git add pages/artic-ebov/ 

git commit -m "message"

git push
```
