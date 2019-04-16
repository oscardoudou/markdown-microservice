infrastruture part
=====================
install docker on ubuntu
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
apt-cache policy docker-ce
sudo apt-get install -y docker-ce
sudo systemctl status docker
sudo groupadd docker
sudo usermod -aG docker $USER
docker run hello-world
groups(need root to reflect the new group)
docker info
```

1. manually configuration(docker install[4] and use without root)[3] on 16.04 for microservice(need create ansible script for this)
2. containerlize microservice and hit the route inside container(expose port correctly and po)
3. build the image, run containertest and test external incoming traffic(change security group on instance)[2] could hit microservice route
ToDo
4. register the created image[1]
5. create deployment(or something else object which specify the service availability) by refering the image registered
6.

[1](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-basics.html)
[2]https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html
[3]https://docs.docker.com/install/linux/linux-postinstall/
[4]https://docs.docker.com/install/linux/docker-ce/ubuntu/
[5]https://stackoverflow.com/questions/33379393/docker-env-vs-run-export