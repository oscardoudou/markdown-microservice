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

<<<<<<< Updated upstream
1. manually configuration:docker install[[1]](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and use without root[[2]](https://docs.docker.com/install/linux/linux-postinstall/) on 16.04 for microservice(need create ansible script for this)
2. containerlize microservice and hit the route inside container(expose docker container port correctly [[3]](https://stackoverflow.com/questions/33379393/docker-env-vs-run-export)
3. build the image, run container and test external incoming traffic(change security group would be needed on instance)
[[4]](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html) 

hit [the link] to test a simple service(need replace with actual markdown preview) running in container on a instance(http://ec2-18-223-124-12.us-east-2.compute.amazonaws.com:3001/markdown)

#### ToDo

4. create ecr repo first(aws cli config) 
[[5]](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration) then register the created image[[6]](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-basics.html)
5. create deployment for a pod with 3 instances[[7]](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)(or something other object which specify the service availability) by refering the registered image
6. expose pod as kubernetes service ?





=======
1. manually configuration(docker install[4] and use without root)[3] on 16.04 for microservice(need create ansible script for this)
2. containerlize microservice and hit the route inside container(expose port correctly and po)
3. build the image, run containertest and test external incoming traffic(change security group on instance)[2] could hit microservice route
ToDo
4. create ecr repo first(aws cli config)[6] then register the created image[1] 
5. create deployment(or something else object which specify the service availability) by refering the image registered
6. expose service ?

[1](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-basics.html)

[2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html)

[3](https://docs.docker.com/install/linux/linux-postinstall/)
[4](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
[5](https://stackoverflow.com/questions/33379393/docker-env-vs-run-export)
[6](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration)
>>>>>>> Stashed changes
