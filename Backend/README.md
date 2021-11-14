# IS5452_project_Backend
This is the python script to start the sentiment analysis service on localhost/8080.  
## How to run the script  
First you need to install python3 as well as the packages needed.
Here are the packages needed to run the service:
1. flask
2. pysentimiento
3. pandas
4. pickle
5. tensorflow  
6. numpy  
After installing all the required packages, run the following command  
`sudo python3 backend.py 8080`  
It will run the service on port 8080.
Or if you want to continuously run the script on background, please run  
`sudo nohup python3 backend.py 8080 &` 
