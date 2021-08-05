import boto3
import botocore
import yaml

# retrieve config
with open('config.yml', 'r') as f:
    config = yaml.load(f)
aws_info = config['aws']

def checkS3File(aws_info, bucket, filePath):
    if ('aws_access_key_id' in aws_info and len(aws_info['aws_access_key_id']) > 0 and 'aws_secret_access_key' in aws_info and len(aws_info['aws_secret_access_key']) > 0):
        session = boto3.Session(
            aws_access_key_id=aws_info['aws_access_key_id'],
            aws_secret_access_key=aws_info['aws_secret_access_key'],
        )
        s3 = session.resource('s3')
    else: 
        s3 = boto3.resource('s3')
    try:
        s3.Object(bucket, filePath).load()
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            return False
        else:
            return False
    else: 
        return True

def retrieveAWSCredentials():
    if ('aws_access_key_id' in aws_info and len(aws_info['aws_access_key_id']) > 0 and 'aws_secret_access_key' in aws_info and len(aws_info['aws_secret_access_key']) > 0):
        export_s3_keys = "export AWS_ACCESS_KEY_ID=%s; export AWS_SECRET_ACCESS_KEY=%s;" % (aws_info['aws_access_key_id'], aws_info['aws_secret_access_key'])
    else:
        # retrieve aws credentials here
        session = boto3.Session()
        credentials = session.get_credentials().get_frozen_credentials()
        export_s3_keys = "export AWS_ACCESS_KEY_ID=%s; export AWS_SECRET_ACCESS_KEY=%s; export AWS_SESSION_TOKEN=%s;" % (credentials.access_key, credentials.secret_key, credentials.token)
    return export_s3_keys