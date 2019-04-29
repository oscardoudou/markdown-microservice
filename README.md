infrastruture part
=====================
## What kubernetes does
[hello minikube](https://kubernetes.io/docs/tutorials/hello-minikube/)

## Install
### docker
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
[docker install](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and [use without root](https://docs.docker.com/install/linux/linux-postinstall/) on 16.04 for microservice(need create ansible script for this)
### aws-cli
* ECR
* S3
* auth docker login 
### kops 
> manage cluster 
### kubectl 
> manage deployment strategy on cluster

[kubectl configuraiton](https://kubernetes.io/docs/tasks/tools/install-kubectl/#verifying-kubectl-configuration) may depend on minikube, since config file wont be generate if no cluster running. So `kubectl cluster-info` won't give expect info until cluster has been created

## Containerlize as Microservice
### dockerlize app(node)
get dockerlized app working on [directly connected container](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-basics.html)
[chaos workshop](https://github.com/CSC-DevOps/Chaos#setup)
object: hit the route inside container(expose docker container port correctly [[3]](https://stackoverflow.com/questions/33379393/docker-env-vs-run-export)
[move node microservice.js inside dockerfile](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/#creating-a-dockerfile)

### build the image

run container and test external incoming traffic(change security group would be needed on instance)
[[4]](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html) 

hit [the link] to test a simple service(need replace with actual markdown preview) 

running in container on a instance(http://ec2-18-223-124-12.us-east-2.compute.amazonaws.com:3001/markdown)

### create ecr repo first(aws cli config) and [pull and push](https://kubernetes.io/docs/concepts/containers/images/#using-aws-ec2-container-registry) 

[remember authenticate docker login every 12 hours](https://docs.aws.amazon.com/AmazonECR/latest/userguide/ECR_AWSCLI.html#AWSCLI_get-login)
[[5]](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration) then register the created image[[6]](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-basics.html) 

> demo it on ec2
  
### [create cluster on ec2](https://github.com/kubernetes/kops/blob/master/docs/aws.md)
 * make sure kops kubectl [awscli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html#install-tool-pip) installed
    [use pip install awscli rather than apt](https://docs.aws.amazon.com/cli/latest/userguide/install-linux.html)
 * [Create an SSH key](https://github.com/nathanpeck/nodejs-aws-workshop/tree/master/6%20-%20Kubernetes%20(kops)#4-create-an-ssh-key)
    ```
    ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
    ```
 * create cluster state storage 
   ```
   aws s3api create-bucket \
    --bucket checkbox-state-store \
    --region us-east-2
   ```
   use ```aws s3 ls``` if forget
 * set env
   ```
    export NAME=checkbox.k8s.local
    export KOPS_STATE_STORE=s3://checkbox-state-store
   ```
 * config availbility zone
    [just region not need 2a, 2b, 2c](https://docs.aws.amazon.com/general/latest/gr/rande.html)
    ```
    aws ec2 describe-availability-zones --region us-east-2
    ```
 * creat cluster
     ```
     kops create cluster \
        --zones us-east-2 \
        ${NAME}
     ```  
     above just generate a cluster configuration, real build happen after confirm
 * validate
    ```
    kubectl get nodes
    kops validate cluster
    ```
    make sure wait until they are all ready
    
    
### [create deployment object with 3 replicas](https://kubernetes.io/docs/tutorials/stateless-application/expose-external-ip-address/)
  
[[7]](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)(or something other object which specify the service availability) by refering the registered image
### [expose pod as kubernetes service and specify the target port](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#expose)


## Demo service availability
> Postman needed to send post request
* delete pods
`kubectl delete pods POD_NAME` pods age change
Pod down(equivalent to container down in our case, since only one container per pod) : you can see one pod's age is actually 38mins, which is because `kubectl delete pod/POD_NAME`. Then kubernetes create another pod and schedules it to one of our two nodes.
service available and no significant delay
* stop instance
Stop EC2 instance in AWS console.
Pods whom belongs to this node disappear, equivalent number pods created and schedule to new node when possible
service available and should expect some delay
Node down(by reboot instance on aws console): one of the nodes status temporarily become NotReady and 3 pods reside on that node restart but not actually reborn that is why AGE stay the same. After about a min, kubernetes recover those 3 pods on that node. 

During node's down period. Postman response seems take a bit longer than before
## Troubleshooting
```
kubectl get pods
kubectl describe pods
```
see pods ready(availbale) status and further event detail(image pull or crashloopbackoff).
```
kubectl logs $POD_NAME
kubectl exec -ti $POD_NAME bash
curl -X POST -F 'key=value' localhost:3001/markdown 
```
See above to see whether containers themselves function the same as they do without pods node.
In our case, we don’t need to specify the container name, because we only have one container inside the pod.
[8](https://kubernetes.io/docs/tutorials/kubernetes-basics/explore/explore-interactive/)

## Nice reference
## [what is inside cluster master node respectively](https://kubernetes.io/docs/concepts/overview/components/)
## [rolling update](https://codeburst.io/getting-started-with-kubernetes-deploy-a-docker-container-with-kubernetes-in-5-minutes-eb4be0e96370)
This is great to make sure that all our nginx pods are not all scaled down at the same time. It also makes sure that it does not create more that 25 percent of the desired number or replicas we specified while performing the rollout. It does not kill old Pods until a sufficient number of new Pods have come up, and does not create new Pods until a sufficient number of old Pods have been killed. This is referred to as “[Rolling Update Strategy](https://www.bmc.com/blogs/kubernetes-deployment/)”. Another key benefit of using deployment.
## [Let’s see how good the ReplicaSet is by killing a pod](https://medium.com/@snewman/kubernetes-pods-replicasets-and-deployments-edc8959f978c)
 

## postman
post http://a618fcdd463fe11e9a7fd0ae0afe671d-1310534138.us-east-2.elb.amazonaws.com:8080/markdown
select body and put form data with key = markdown, value = 
```
{NumberQuestions:true}
-----------
Start with header for global options:
{NumberQuestions:true}
-----------
Start with header for global options:
{NumberQuestions:true}
-----------
```
you will see the markdown

## replace [server.js](https://github.com/chrisparnin/checkbox.io/blob/master/server-side/site/server.js#L28) as follow in checkbox

require got
```
app.post('/api/design/survey', 
	function(req,res)
	{
		console.log(req.body.markdown);
		//var text = marqdown.render( req.query.markdown );
		var text = got.put('{url of microservice}/markdown');
		res.send( {preview: text} );
	}
);
```
