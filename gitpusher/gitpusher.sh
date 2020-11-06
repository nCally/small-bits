
# gitpusher script:
# this script is supposed to help with repetitive commands I write to git local changes to remote

echo "Enter message"
read message
cd $PWD
git add .
git commit -m "${message}"

if [ -n "$(git status - porcelain)" ];
then
  echo "IT IS CLEAN"
else 
  git status
  echo "Pushing data to remote server"
  git push
fi