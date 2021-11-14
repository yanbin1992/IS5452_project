# IS5452_project_Backend
File backend.py is the python script to start the sentiment analysis service on localhost/8080. 
Other files are for predict function and the model data.  
## How to run the script  
First you need to install python3 (version 3.8 or later) as well as the packages needed.
Here are the packages needed to run the service:
1. flask
2. pysentimiento
3. pandas
4. pickle
5. tensorflow (tensorflow 2.6.0 with keras 2.6.0 is recommended, the latest version of tensorflow and keras may be problematic due to incompatible)
6. numpy  

After installing all the required packages, run the following command which will run the service on port 8080  
`sudo python3 backend.py 8080`   

Or if you want to continuously run the script on background, please run  
`sudo nohup python3 backend.py 8080 &` 
