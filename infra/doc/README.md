# Fat Fuzzy Doc Infrastructure

This package defines `[root]/apps/doc` backend infrastructure using configuration templates that are deployed to [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) as [stacks](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacks.html).

The templates are generated using TypeScript and the following libraries:

- [AWS Cloud Development Kit](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html): use this to deploy cloudformation templates and to provision AWS resources

- [AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/index.html): use this to interact with AWS resources via AWS API endpoints

Further guidance for AWS architecture can be found here:

- [AWS Well Architected Labs](https://www.wellarchitectedlabs.com/)

- [AWS documentation examples](https://github.com/awsdocs/aws-doc-sdk-examples)

- S3 Examples:
  - [CloudFront with S3 Bucket Origin](https://www.wellarchitectedlabs.com/security/100_labs/100_cloudfront_with_s3_bucket_origin/)
  - [Amazon S3 JavaScript SDK v3 code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/s3)

## Prerequisites

- AWS Account
- aws-cli
- AWS configuration using account credentials

## Getting started

### Limiting access to AWS resources

[Example IAM identity-based policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html)

Create policy

```shell
aws iam create-policy \
  --policy-name my-cdk-execution-policy \
  --policy-document file://iam-policy-example.json
```

Delete policy

```shell
aws iam delete-policy --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/my-cdk-execution-policy
```

### Cloudformation Workflow

Bootstrap CDK cloudformation templates

```shell
pnpm cdk bootstrap --cloudformation-execution-policies my-cdk-execution-policy
```

Deploy CDK cloudformation templates

```shell
pnpm cdk deploy
```

Delete created cloudformation stacks

```shell
aws cloudformation delete-stack --stack-name my-stack
```
