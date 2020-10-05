import os
import pwd
import grp
import sys
import shutil

basedir = "/var/www/"

domain_name = input("domain name: ")

mkdir = basedir + domain_name + "/html"

try:
    # 1.
    # make a new directory in /var/www
    # os.makedirs(mkdir)
    os.system('sudo mkdir -p ' + mkdir)

    # 2.
    # assign ownership of the directory with the $USER environment variable
    #user = os.getenv("USER")
    #os.chown(mkdir, pwd.getpwnam(user).pw_uid, grp.getgrnam(user).gr_gid)
    os.system('sudo chown -R $USER:$USER ' + mkdir)

    # 3.
    # add permission
    # os.chmod(basedir + domain_name, 0o755)  # add 0o755 for permission
    os.system('sudo chmod -R 755 ' + basedir + domain_name)

    # 4.
    # copy the index.html from this current directory to the /var/www/XX/html newly created
    src = os.getcwd() + "/index.html"
    shutil.copy2(src, mkdir)

    # 5.
    # choose which type of server file to create; whether for react build or node server
    choice = input("setup -> [1] react [2] node api: ")

    try:
        # 6
        # create site-available file
        server_file = open(os.getcwd() + "/" + domain_name, "x")
        port = ''  # if there is need for it, in the case of a node app
# 7
# choose the template file to use to create the server file
        if choice == "1":
            template = os.getcwd() + "/react.txt"

        elif choice == "2":
            template = os.getcwd() + "/node.txt"

# 7a
            # if the choice is 2, meaning its a node app and running on a port
            # so we get the input of the port the app is running on
            port = input("what port is the app running on?: ")

# 8
# open the template that was choosen in step 7
        template_file = open(template, "rt")
# 9
# map through the lines in the template file to replace the domain name and port number
        for line in template_file:
            server_file.write(line.replace(
                '$DOMAIN', domain_name).replace('$PORT', port))

# 10
# close the server file and template file
        server_file.close()
        template_file.close()

        os.system('sudo mv ' + domain_name + ' /etc/nginx/sites-available')

# 11
# link the site available file and the site enabled nginx
        os.system('sudo ln -s /etc/nginx/sites-available/' +
                  domain_name + " /etc/nginx/sites-enabled/")

# 12
# test the linking and other settings
        os.system('sudo nginx -t')

# 13
# restart nginx
        os.system('sudo systemctl restart nginx')

    except FileExistsError:
        print("This file already exists")


except OSError:
    print("failed to make directory")
