from sys import argv

#---------------------
# Script that creates a CNAME record with the passed url
#---------------------

# If no argument is given, aka no url is passed, prompt an error
if len(argv) < 2:
    raise Exception("Pass a url")

# Else, create the cname record with the first argument as the url
with open("./dist/CNAME", "w") as f:
    f.write(argv[1])