import type { AwsService } from './types'

export const AI_ML_SERVICES: AwsService[] = [
  {
    id: 'bedrock',
    name: 'Bedrock',
    fullName: 'Amazon Bedrock',
    cat: 'ai_ml',
    level: 'beginner',
    icon: '\u{1F916}',
    short: 'Access top AI models (Claude, Llama, Titan, etc.) via a single API. No ML infrastructure needed.',
    analogy: 'A food court with the best restaurants \u2014 pick any chef (model), order through one counter (API), done.',
    detail: 'Bedrock gives you API access to foundation models from Anthropic (Claude), Meta (Llama), Amazon (Titan), and others. You don\'t need to manage GPUs, training, or model hosting. Just call the API with your prompt and get a response. You can also fine-tune models on your data and build RAG (Retrieval Augmented Generation) applications.',
    useCases: [
      'Adding AI chat to your application',
      'Text summarization and generation',
      'Image generation',
      'Building RAG-powered knowledge assistants',
    ],
    keyTerms: {
      'Foundation Model': 'A large pre-trained AI model',
      RAG: 'Retrieval Augmented Generation \u2014 feeding relevant documents to the model with your query',
      Token: 'A unit of text (roughly 3/4 of a word)',
    },
    pricing: 'Pay per input/output token. Claude 3.5 Sonnet: $3/million input tokens, $15/million output tokens.',
    howItWorks:
      'Bedrock acts as a managed gateway to multiple foundation models. When your frontend app sends a request, it hits the Bedrock API endpoint (via an API Gateway + Lambda, or directly from a backend server). Bedrock routes the request to the selected model, handles inference on AWS-managed GPU infrastructure, and streams the response back. You never provision instances or manage model weights \u2014 it is entirely serverless from your perspective.\n\n' +
      'Under the hood, Bedrock supports two main invocation patterns: synchronous (InvokeModel) and streaming (InvokeModelWithResponseStream). Streaming is critical for chat UIs \u2014 it sends tokens back as they are generated, so your React frontend can render partial responses in real time using an EventSource or WebSocket connection through your backend. Bedrock also provides the Converse API, a unified interface that normalizes request/response formats across different model providers so you can swap models without changing your application code.\n\n' +
      'For RAG applications, Bedrock Knowledge Bases handles the heavy lifting: it ingests your documents from S3, chunks them, generates embeddings, stores them in a vector database (OpenSearch Serverless or Pinecone), and retrieves relevant context at query time. This means you can wire up a "chat with your docs" feature without managing embedding pipelines or vector stores yourself. Bedrock Agents go further by letting models call external APIs and execute multi-step workflows autonomously.',
    gotchas: [
      'Model access is not automatic \u2014 you must explicitly request access to each model in the Bedrock console before your API calls will work. This catches many developers the first time.',
      'Token limits vary wildly between models. Claude 3.5 Sonnet supports 200K input tokens; some older models cap at 4K. Always check the model card before building your prompt strategy.',
      'Bedrock is not available in all AWS regions. If your Lambda or backend is in a region without Bedrock, you will need cross-region calls, which adds latency. Check regional availability before architecting.',
      'Streaming responses require chunked transfer encoding on your backend and proper handling on the frontend (e.g., ReadableStream or EventSource). A simple fetch().then(res => res.json()) will not work for streaming.',
    ],
    whenNotToUse: [
      'You need to train a custom model from scratch on proprietary data \u2014 use SageMaker instead. Bedrock fine-tuning is limited to parameter-efficient methods on supported models.',
      'Your workload requires on-premise or air-gapped deployment for compliance \u2014 Bedrock is cloud-only with no self-hosted option.',
      'You need sub-10ms inference latency for real-time systems \u2014 foundation models are inherently slower. Consider a smaller, self-hosted model on SageMaker or a dedicated endpoint.',
    ],
    relatedServices: ['sagemaker', 'lambda', 'api-gateway', 's3', 'opensearch', 'cognito'],
    relatedGuides: ['ai-infra'],
    cliExample:
      `# Invoke Claude 3.5 Sonnet via Bedrock\naws bedrock-runtime invoke-model \\\n  --model-id anthropic.claude-3-5-sonnet-20241022-v2:0 \\\n  --content-type application/json \\\n  --accept application/json \\\n  --body '{"anthropic_version":"bedrock-2023-05-31","max_tokens":256,"messages":[{"role":"user","content":"Explain React Server Components in 2 sentences."}]}' \\\n  output.json\n\ncat output.json | jq '.content[0].text'`,
    cdkExample:
      `import * as cdk from 'aws-cdk-lib';\nimport * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';\nimport * as iam from 'aws-cdk-lib/aws-iam';\nimport * as apigateway from 'aws-cdk-lib/aws-apigateway';\n\n// Lambda function that calls Bedrock\nconst bedrockFn = new lambda.NodejsFunction(this, 'BedrockHandler', {\n  entry: 'lambda/bedrock-handler.ts',\n  runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,\n  timeout: cdk.Duration.seconds(60),\n  memorySize: 256,\n});\n\n// Grant Bedrock invoke permissions\nbedrockFn.addToRolePolicy(new iam.PolicyStatement({\n  actions: ['bedrock:InvokeModel', 'bedrock:InvokeModelWithResponseStream'],\n  resources: ['arn:aws:bedrock:*::foundation-model/anthropic.*'],\n}));\n\n// API Gateway endpoint for your frontend\nconst api = new apigateway.RestApi(this, 'BedrockApi');\napi.root.addResource('chat').addMethod('POST',\n  new apigateway.LambdaIntegration(bedrockFn)\n);`,
    code:
      `// Call Bedrock from a Node.js backend (Lambda or Express)\nimport { BedrockRuntimeClient, InvokeModelWithResponseStreamCommand } from '@aws-sdk/client-bedrock-runtime';\n\nconst client = new BedrockRuntimeClient({ region: 'us-east-1' });\n\nasync function* streamChat(userMessage: string) {\n  const command = new InvokeModelWithResponseStreamCommand({\n    modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',\n    contentType: 'application/json',\n    accept: 'application/json',\n    body: JSON.stringify({\n      anthropic_version: 'bedrock-2023-05-31',\n      max_tokens: 1024,\n      messages: [{ role: 'user', content: userMessage }],\n    }),\n  });\n\n  const response = await client.send(command);\n  for await (const event of response.body!) {\n    if (event.chunk?.bytes) {\n      const parsed = JSON.parse(new TextDecoder().decode(event.chunk.bytes));\n      if (parsed.type === 'content_block_delta') {\n        yield parsed.delta.text;\n      }\n    }\n  }\n}`,
  },
  {
    id: 'sagemaker',
    name: 'SageMaker',
    fullName: 'Amazon SageMaker',
    cat: 'ai_ml',
    level: 'advanced',
    icon: '\u{1F9EA}',
    short: 'A full ML platform for building, training, and deploying machine learning models. The "kitchen" where data scientists cook.',
    analogy: 'A fully equipped research lab \u2014 has every tool you need to build, test, and deploy AI models from scratch.',
    detail: 'SageMaker is the comprehensive ML platform. It provides Jupyter notebooks, built-in algorithms, distributed training on GPU clusters, automatic model tuning, one-click deployment, and MLOps pipelines. If Bedrock is "use someone else\'s AI," SageMaker is "build your own."',
    useCases: [
      'Training custom ML models',
      'Real-time and batch model inference',
      'Data labeling and preparation',
    ],
    keyTerms: {
      'Notebook Instance': 'A Jupyter environment for experimentation',
      'Training Job': 'A compute session that trains a model',
      Endpoint: 'A deployed model ready to accept predictions',
    },
    pricing: 'Complex \u2014 varies by instance type, training time, and inference. Notebook instances start at ~$0.05/hr.',
    howItWorks:
      'SageMaker orchestrates the entire ML lifecycle. You start in a SageMaker Studio notebook (a managed JupyterLab environment) where you explore data, prototype models, and iterate. When you are ready to train, you launch a Training Job that spins up one or more EC2 instances (often GPU-powered like ml.p3 or ml.g5), runs your training script, saves the model artifact to S3, and shuts down the instances. You only pay for the time the training job runs, not for idle compute.\n\n' +
      'Once trained, you deploy the model to a SageMaker Endpoint \u2014 a managed inference server that auto-scales based on traffic. Your frontend calls this endpoint (typically through an API Gateway + Lambda layer) to get predictions. SageMaker handles the container runtime, load balancing, and health checks. For batch workloads, SageMaker Batch Transform processes large datasets without maintaining a persistent endpoint.\n\n' +
      'For production ML, SageMaker Pipelines lets you define end-to-end MLOps workflows as code: data preprocessing, training, evaluation, and conditional deployment. Model Registry tracks model versions and approval status. Model Monitor watches deployed endpoints for data drift and prediction quality degradation. As a frontend engineer, you will primarily interact with SageMaker endpoints as HTTP APIs \u2014 think of them as specialized backend services that return predictions instead of database rows.',
    gotchas: [
      'SageMaker costs can spiral fast. A single ml.p3.2xlarge training instance costs ~$3.83/hr. Always set StoppingCondition on training jobs and configure auto-scaling (including scale-to-zero) on endpoints to avoid surprise bills.',
      'Endpoint cold starts can be 5\u201310 minutes for large models. If your frontend needs fast responses, keep at least one instance warm or use Serverless Inference (which trades cold-start latency for lower baseline cost).',
      'SageMaker Studio and notebook instances are different things with different pricing. Studio is the newer IDE experience; classic notebook instances are standalone. Mixing them up leads to confusion around IAM roles and networking.',
      'Docker is central to SageMaker \u2014 training and inference run inside containers. If you use a custom algorithm, you need to build a Docker image that follows SageMaker\'s container contract (specific directory paths and environment variables). The built-in algorithms and Hugging Face containers handle this for you.',
    ],
    whenNotToUse: [
      'You just need to call a pre-built AI model (text generation, chat, summarization) \u2014 use Bedrock. SageMaker is overkill if you are not training or fine-tuning your own models.',
      'Your ML workload is a simple scikit-learn model that runs in seconds \u2014 deploy it as a Lambda function instead. SageMaker endpoints have overhead that does not make sense for lightweight models.',
      'You need a quick prototype and do not want to deal with AWS infrastructure \u2014 consider Hugging Face Inference Endpoints or a managed ML platform like Replicate for faster iteration.',
    ],
    relatedServices: ['bedrock', 's3', 'ecr', 'lambda', 'cloudwatch', 'iam'],
    relatedGuides: ['ai-infra'],
    cliExample:
      `# Create a real-time inference endpoint from a trained model\naws sagemaker create-model \\\n  --model-name my-text-classifier \\\n  --primary-container Image=763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-inference:2.0-transformers4.28-gpu-py310-cu118-ubuntu20.04,ModelDataUrl=s3://my-bucket/model.tar.gz \\\n  --execution-role-arn arn:aws:iam::123456789012:role/SageMakerRole\n\naws sagemaker create-endpoint-config \\\n  --endpoint-config-name my-config \\\n  --production-variants VariantName=primary,ModelName=my-text-classifier,InstanceType=ml.g5.xlarge,InitialInstanceCount=1\n\naws sagemaker create-endpoint \\\n  --endpoint-name my-endpoint \\\n  --endpoint-config-name my-config`,
    cdkExample:
      `import * as cdk from 'aws-cdk-lib';\nimport * as sagemaker from 'aws-cdk-lib/aws-sagemaker';\nimport * as iam from 'aws-cdk-lib/aws-iam';\n\nconst role = new iam.Role(this, 'SageMakerRole', {\n  assumedBy: new iam.ServicePrincipal('sagemaker.amazonaws.com'),\n  managedPolicies: [\n    iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess'),\n  ],\n});\n\nconst model = new sagemaker.CfnModel(this, 'Model', {\n  executionRoleArn: role.roleArn,\n  primaryContainer: {\n    image: '763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-inference:2.0-transformers4.28-gpu-py310-cu118-ubuntu20.04',\n    modelDataUrl: 's3://my-bucket/model.tar.gz',\n  },\n});\n\nconst endpointConfig = new sagemaker.CfnEndpointConfig(this, 'EndpointConfig', {\n  productionVariants: [{\n    variantName: 'primary',\n    modelName: model.attrModelName,\n    instanceType: 'ml.g5.xlarge',\n    initialInstanceCount: 1,\n  }],\n});\n\nnew sagemaker.CfnEndpoint(this, 'Endpoint', {\n  endpointConfigName: endpointConfig.attrEndpointConfigName,\n});`,
    code:
      `// Invoke a SageMaker endpoint from a Node.js backend\nimport { SageMakerRuntimeClient, InvokeEndpointCommand } from '@aws-sdk/client-sagemaker-runtime';\n\nconst client = new SageMakerRuntimeClient({ region: 'us-east-1' });\n\nasync function predict(text: string) {\n  const command = new InvokeEndpointCommand({\n    EndpointName: 'my-text-classifier',\n    ContentType: 'application/json',\n    Body: JSON.stringify({ inputs: text }),\n  });\n\n  const response = await client.send(command);\n  const result = JSON.parse(new TextDecoder().decode(response.Body));\n  return result; // e.g. [{ label: 'POSITIVE', score: 0.98 }]\n}`,
  },
  {
    id: 'rekognition',
    name: 'Rekognition',
    fullName: 'Amazon Rekognition',
    cat: 'ai_ml',
    level: 'beginner',
    icon: '\u{1F441}\uFE0F',
    short: 'Image and video analysis. Detects objects, text, faces, and content moderation \u2014 no ML expertise needed.',
    analogy: 'A pair of AI glasses that can identify objects, read signs, and spot inappropriate content in images.',
    detail: 'Rekognition provides pre-built computer vision via API. Upload an image, get back labels (dog, car, sunset), detected text, face analysis (emotions, age range), and content moderation flags. No model training required \u2014 it works out of the box.',
    useCases: [
      'Content moderation for user uploads',
      'Extracting text from images (OCR)',
      'Searching photos by content',
    ],
    keyTerms: {
      Label: 'A detected object or scene in an image',
      'Face Analysis': 'Detecting faces and estimating attributes',
      'Content Moderation': 'Flagging inappropriate or explicit content',
    },
    pricing: 'Free tier: 5K images/month for 12 months. After: $1.00/1000 images.',
    howItWorks:
      'Rekognition exposes a set of pre-trained deep learning models behind simple API calls. You send an image (either as raw bytes or an S3 object reference) to one of its specialized endpoints \u2014 DetectLabels, DetectModerationLabels, DetectText, DetectFaces, etc. \u2014 and get back structured JSON with confidence scores. The models run entirely on AWS-managed infrastructure, so there is zero setup.\n\n' +
      'For image-based workflows (like moderating user-uploaded profile photos), the typical architecture is: your frontend uploads the image to S3 via a presigned URL, an S3 event triggers a Lambda function, the Lambda calls Rekognition, and the result (safe/unsafe, detected labels) is stored in DynamoDB or sent to your backend API. This keeps the moderation logic async and decoupled from your frontend.\n\n' +
      'For video analysis, Rekognition works asynchronously. You call StartLabelDetection (or similar Start* API), Rekognition processes the video in the background, and notifies an SNS topic when done. You then call GetLabelDetection to retrieve timestamped results. This is useful for building features like automatic video tagging or detecting specific scenes. Rekognition Custom Labels lets you train a custom object detection model using your own labeled images if the built-in models do not cover your domain.',
    gotchas: [
      'Rekognition has a 15 MB image size limit for API calls with raw bytes, and 5 MB if the image is passed inline as base64. For larger files, always reference the image from S3 instead.',
      'Face analysis provides estimated age ranges and apparent emotions, not definitive facts. Do not present these to users as ground truth \u2014 they are probabilistic and can be biased.',
      'Content moderation is not perfect. Always have a human review pipeline for edge cases. Rekognition gives confidence scores, so set your threshold carefully \u2014 too low and you get false positives, too high and harmful content slips through.',
      'Video analysis is asynchronous-only. You cannot get real-time video analysis from Rekognition; if you need frame-by-frame processing in real time, you will need to extract frames and call the image APIs individually.',
    ],
    whenNotToUse: [
      'You need to extract structured data from documents (tables, forms, key-value pairs) \u2014 use Textract. Rekognition does basic OCR but does not understand document layout.',
      'You need a highly specialized object detector for a niche domain (e.g., detecting specific manufacturing defects) \u2014 Rekognition Custom Labels works for simpler cases, but SageMaker gives you full control over model architecture and training.',
      'You need real-time video analysis at scale (e.g., live security camera feeds with sub-second latency) \u2014 consider running your own model on SageMaker or at the edge with AWS Panorama.',
    ],
    relatedServices: ['s3', 'lambda', 'sns', 'textract', 'dynamodb', 'cloudfront'],
    relatedGuides: [],
    cliExample:
      `# Detect labels (objects/scenes) in an image stored in S3\naws rekognition detect-labels \\\n  --image '{"S3Object":{"Bucket":"my-uploads","Name":"photo.jpg"}}' \\\n  --max-labels 10 \\\n  --min-confidence 80 \\\n  --query 'Labels[].{Name:Name,Confidence:Confidence}' \\\n  --output table\n\n# Moderate an image for unsafe content\naws rekognition detect-moderation-labels \\\n  --image '{"S3Object":{"Bucket":"my-uploads","Name":"photo.jpg"}}' \\\n  --min-confidence 70`,
    cdkExample:
      `import * as cdk from 'aws-cdk-lib';\nimport * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';\nimport * as s3 from 'aws-cdk-lib/aws-s3';\nimport * as s3n from 'aws-cdk-lib/aws-s3-notifications';\nimport * as iam from 'aws-cdk-lib/aws-iam';\n\nconst uploadBucket = new s3.Bucket(this, 'Uploads', {\n  cors: [{ allowedMethods: [s3.HttpMethods.PUT], allowedOrigins: ['*'], allowedHeaders: ['*'] }],\n});\n\nconst moderatorFn = new lambda.NodejsFunction(this, 'Moderator', {\n  entry: 'lambda/moderate-image.ts',\n  runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,\n  timeout: cdk.Duration.seconds(30),\n  environment: { BUCKET_NAME: uploadBucket.bucketName },\n});\n\n// Grant Rekognition access\nmoderatorFn.addToRolePolicy(new iam.PolicyStatement({\n  actions: ['rekognition:DetectLabels', 'rekognition:DetectModerationLabels'],\n  resources: ['*'],\n}));\nuploadBucket.grantRead(moderatorFn);\n\n// Trigger on upload\nuploadBucket.addEventNotification(\n  s3.EventType.OBJECT_CREATED,\n  new s3n.LambdaDestination(moderatorFn),\n  { suffix: '.jpg' }\n);`,
    code:
      `// Moderate user-uploaded images from a Node.js backend\nimport { RekognitionClient, DetectModerationLabelsCommand, DetectLabelsCommand } from '@aws-sdk/client-rekognition';\n\nconst client = new RekognitionClient({ region: 'us-east-1' });\n\nasync function moderateImage(bucket: string, key: string) {\n  const moderation = await client.send(new DetectModerationLabelsCommand({\n    Image: { S3Object: { Bucket: bucket, Name: key } },\n    MinConfidence: 70,\n  }));\n\n  const isUnsafe = (moderation.ModerationLabels?.length ?? 0) > 0;\n\n  const labels = await client.send(new DetectLabelsCommand({\n    Image: { S3Object: { Bucket: bucket, Name: key } },\n    MaxLabels: 10,\n    MinConfidence: 80,\n  }));\n\n  return {\n    safe: !isUnsafe,\n    flags: moderation.ModerationLabels?.map(l => l.Name) ?? [],\n    tags: labels.Labels?.map(l => l.Name!) ?? [],\n  };\n}`,
  },
  {
    id: 'polly',
    name: 'Polly',
    fullName: 'Amazon Polly',
    cat: 'ai_ml',
    level: 'beginner',
    icon: '\u{1F5E3}\uFE0F',
    short: 'Text-to-speech. Turns text into natural-sounding audio in dozens of languages and voices.',
    analogy: 'A voice actor on demand \u2014 give them a script, choose a voice, and they read it aloud instantly.',
    detail: 'Polly converts text into lifelike speech using deep learning. It supports SSML for controlling pronunciation, speed, and emphasis. Neural voices sound remarkably human. Great for accessibility features, voice interfaces, and content creation.',
    useCases: [
      'Accessibility (reading content aloud)',
      'Voice interfaces and IVR systems',
      'Generating audio versions of articles',
    ],
    keyTerms: {
      'Neural Voice': 'Higher-quality voice using deep learning',
      SSML: 'Speech Synthesis Markup Language \u2014 control pronunciation and pauses',
    },
    pricing: 'Free tier: 5M characters/month for 12 months. After: $4/million characters (neural).',
    howItWorks:
      'Polly takes plain text or SSML-annotated text and synthesizes it into an audio stream. You call the SynthesizeSpeech API with your text, choose a voice ID (e.g., "Joanna" for US English neural), select an output format (MP3, OGG, PCM), and Polly returns an audio stream that you can play directly or save to S3. The synthesis happens in real time \u2014 short texts return in milliseconds.\n\n' +
      'For frontend applications, the typical pattern is: your backend (Lambda or Express) calls Polly, saves the resulting MP3 to S3, and returns a CloudFront URL to the frontend. The frontend plays it with a standard HTML5 <audio> element. For dynamic content (like reading a user\'s dashboard summary), you can stream the audio directly from your backend without saving to S3 first. Polly also supports SpeechMark output, which returns timing metadata \u2014 when each word or sentence starts in the audio. This is essential for building "karaoke-style" text highlighting that syncs with the audio playback.\n\n' +
      'For large texts (over 100,000 characters or when you want async processing), use StartSpeechSynthesisTask instead. This creates a background job that writes the output directly to your S3 bucket and notifies you via SNS when complete. This is the right approach for generating audio versions of entire articles or documentation pages.',
    gotchas: [
      'Neural voices sound significantly better than standard voices but cost 4x more ($16 vs $4 per million characters). For user-facing features, neural is almost always worth it; for internal tooling, standard may suffice.',
      'The SynthesizeSpeech API has a 3,000-character limit per request. For longer text, you need to split it into chunks and concatenate the audio, or use StartSpeechSynthesisTask for async processing (which supports up to 200,000 characters).',
      'Not all voices are available in all regions, and neural voices are a subset of the total voice catalog. Always check the voice list for your target region before hardcoding voice IDs.',
      'SSML is powerful but picky \u2014 invalid SSML will cause the API to reject the entire request. Validate SSML markup before sending, especially if it is generated from user input or templates.',
    ],
    whenNotToUse: [
      'You need speech-to-text (the reverse direction) \u2014 use Amazon Transcribe instead. Polly only converts text to speech.',
      'You need real-time voice cloning or voice conversion \u2014 Polly offers a fixed catalog of voices and does not support custom voice training. Look at third-party services for that use case.',
      'Your application just needs a few static audio clips (like button sounds or short prompts) \u2014 pre-record them as files. Using Polly for fixed, unchanging audio adds unnecessary cost and latency.',
    ],
    relatedServices: ['transcribe', 's3', 'cloudfront', 'lambda', 'sns'],
    relatedGuides: [],
    cliExample:
      `# Synthesize speech and save as MP3\naws polly synthesize-speech \\\n  --text "Hello! This is Amazon Polly generating speech for your React application." \\\n  --output-format mp3 \\\n  --voice-id Joanna \\\n  --engine neural \\\n  output.mp3\n\n# List available neural voices for English\naws polly describe-voices \\\n  --engine neural \\\n  --language-code en-US \\\n  --query 'Voices[].{Id:Id,Name:Name,Gender:Gender}' \\\n  --output table`,
    cdkExample:
      `import * as cdk from 'aws-cdk-lib';\nimport * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';\nimport * as s3 from 'aws-cdk-lib/aws-s3';\nimport * as iam from 'aws-cdk-lib/aws-iam';\nimport * as apigateway from 'aws-cdk-lib/aws-apigateway';\n\nconst audioBucket = new s3.Bucket(this, 'AudioBucket', {\n  lifecycleRules: [{ expiration: cdk.Duration.days(7) }], // Auto-clean old audio\n});\n\nconst ttsFunction = new lambda.NodejsFunction(this, 'TextToSpeech', {\n  entry: 'lambda/text-to-speech.ts',\n  runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,\n  timeout: cdk.Duration.seconds(30),\n  environment: { AUDIO_BUCKET: audioBucket.bucketName },\n});\n\nttsFunction.addToRolePolicy(new iam.PolicyStatement({\n  actions: ['polly:SynthesizeSpeech'],\n  resources: ['*'],\n}));\naudioBucket.grantWrite(ttsFunction);\n\nconst api = new apigateway.RestApi(this, 'TtsApi');\napi.root.addResource('speak').addMethod('POST',\n  new apigateway.LambdaIntegration(ttsFunction)\n);`,
    code:
      `// Generate speech from text and upload to S3\nimport { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';\nimport { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';\n\nconst polly = new PollyClient({ region: 'us-east-1' });\nconst s3 = new S3Client({ region: 'us-east-1' });\n\nasync function textToSpeech(text: string, key: string) {\n  const speech = await polly.send(new SynthesizeSpeechCommand({\n    Text: text,\n    OutputFormat: 'mp3',\n    VoiceId: 'Joanna',\n    Engine: 'neural',\n  }));\n\n  // Upload MP3 to S3\n  const audioBytes = await speech.AudioStream!.transformToByteArray();\n  await s3.send(new PutObjectCommand({\n    Bucket: process.env.AUDIO_BUCKET!,\n    Key: \`audio/\${key}.mp3\`,\n    Body: audioBytes,\n    ContentType: 'audio/mpeg',\n  }));\n\n  return \`https://\${process.env.AUDIO_BUCKET}.s3.amazonaws.com/audio/\${key}.mp3\`;\n}`,
  },
  {
    id: 'transcribe',
    name: 'Transcribe',
    fullName: 'Amazon Transcribe',
    cat: 'ai_ml',
    level: 'beginner',
    icon: '\u{1F4DD}',
    short: 'Speech-to-text. Converts audio and video files into accurate text transcriptions.',
    analogy: 'A super-fast stenographer that listens to any audio and types out what was said.',
    detail: 'Transcribe uses ML to convert speech to text. It supports real-time streaming transcription and batch processing of audio files. Features include speaker identification, custom vocabulary, automatic punctuation, and content redaction for PII.',
    useCases: [
      'Transcribing meeting recordings',
      'Subtitles for video content',
      'Voice search and commands',
      'Call center analytics',
    ],
    keyTerms: {
      'Streaming Transcription': 'Real-time transcription as audio plays',
      'Custom Vocabulary': 'Teaching Transcribe domain-specific terms',
    },
    pricing: 'Free tier: 60 minutes/month for 12 months. After: $0.024/minute.',
    howItWorks:
      'Transcribe offers two modes: batch and streaming. In batch mode, you point it at an audio or video file in S3 (MP3, MP4, WAV, FLAC, and more), start a transcription job, and poll or get notified when the text is ready. The output is a JSON file in S3 containing the full transcript with word-level timestamps and confidence scores. Batch mode is best for processing recordings after the fact.\n\n' +
      'Streaming mode opens a WebSocket connection to the Transcribe service and sends audio chunks in real time. As Transcribe processes each chunk, it sends back partial (interim) results that update as more context arrives, followed by final results for completed phrases. This is how you build live captioning in a frontend app \u2014 your backend maintains the WebSocket to Transcribe and forwards results to the browser via Server-Sent Events or your own WebSocket.\n\n' +
      'Transcribe also offers specialized variants: Transcribe Medical for healthcare terminology (HIPAA-eligible), and Transcribe Call Analytics for contact center recordings, which adds sentiment analysis, issue detection, and call summarization on top of the base transcription. For domain-specific jargon, Custom Vocabulary lets you provide a list of terms with pronunciations so that Transcribe recognizes words like "React", "Next.js", or your company\'s product names correctly.',
    gotchas: [
      'Streaming transcription uses WebSockets with AWS Signature V4 authentication, which is non-trivial to set up. Use the @aws-sdk/client-transcribe-streaming package \u2014 do not try to roll your own signing.',
      'Transcribe supports specific audio formats and sample rates. For streaming, 16kHz PCM is ideal. Sending audio in the wrong format will produce garbage results without an obvious error message.',
      'Speaker diarization (identifying who said what) is available but adds latency and works best with 2\u201310 speakers. It is not available in streaming mode \u2014 only batch jobs support it.',
      'PII redaction replaces sensitive data in the transcript with [PII], but it is not 100% accurate. For HIPAA or PCI compliance, always implement a secondary review process.',
    ],
    whenNotToUse: [
      'You need text-to-speech (the reverse direction) \u2014 use Amazon Polly. Transcribe only converts speech to text.',
      'Your audio is music, sound effects, or non-speech audio \u2014 Transcribe is trained on human speech and will produce poor results on non-speech content.',
      'You need to transcribe very short audio clips (under 500ms) with sub-100ms latency \u2014 the streaming connection overhead may not be worth it. Consider client-side speech recognition via the Web Speech API for simple voice commands.',
    ],
    relatedServices: ['polly', 's3', 'lambda', 'kinesis', 'comprehend'],
    relatedGuides: [],
    cliExample:
      `# Start a batch transcription job\naws transcribe start-transcription-job \\\n  --transcription-job-name meeting-2024-01 \\\n  --media MediaFileUri=s3://my-recordings/meeting.mp3 \\\n  --media-format mp3 \\\n  --language-code en-US \\\n  --output-bucket-name my-transcripts \\\n  --settings ShowSpeakerLabels=true,MaxSpeakerLabels=4\n\n# Check job status\naws transcribe get-transcription-job \\\n  --transcription-job-name meeting-2024-01 \\\n  --query 'TranscriptionJob.{Status:TranscriptionJobStatus,OutputUrl:Transcript.TranscriptFileUri}'`,
    cdkExample:
      `import * as cdk from 'aws-cdk-lib';\nimport * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';\nimport * as s3 from 'aws-cdk-lib/aws-s3';\nimport * as s3n from 'aws-cdk-lib/aws-s3-notifications';\nimport * as iam from 'aws-cdk-lib/aws-iam';\n\nconst recordingsBucket = new s3.Bucket(this, 'Recordings');\nconst transcriptsBucket = new s3.Bucket(this, 'Transcripts');\n\nconst transcribeFn = new lambda.NodejsFunction(this, 'TranscribeHandler', {\n  entry: 'lambda/start-transcription.ts',\n  runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,\n  timeout: cdk.Duration.seconds(30),\n  environment: {\n    OUTPUT_BUCKET: transcriptsBucket.bucketName,\n  },\n});\n\ntranscribeFn.addToRolePolicy(new iam.PolicyStatement({\n  actions: [\n    'transcribe:StartTranscriptionJob',\n    'transcribe:GetTranscriptionJob',\n  ],\n  resources: ['*'],\n}));\nrecordingsBucket.grantRead(transcribeFn);\ntranscriptsBucket.grantWrite(transcribeFn);\n\n// Auto-transcribe when audio is uploaded\nrecordingsBucket.addEventNotification(\n  s3.EventType.OBJECT_CREATED,\n  new s3n.LambdaDestination(transcribeFn),\n  { suffix: '.mp3' }\n);`,
    code:
      `// Start a transcription job from a Node.js backend\nimport { TranscribeClient, StartTranscriptionJobCommand, GetTranscriptionJobCommand } from '@aws-sdk/client-transcribe';\n\nconst client = new TranscribeClient({ region: 'us-east-1' });\n\nasync function transcribeAudio(s3Uri: string, jobName: string) {\n  await client.send(new StartTranscriptionJobCommand({\n    TranscriptionJobName: jobName,\n    Media: { MediaFileUri: s3Uri },\n    MediaFormat: 'mp3',\n    LanguageCode: 'en-US',\n    OutputBucketName: process.env.OUTPUT_BUCKET,\n    Settings: {\n      ShowSpeakerLabels: true,\n      MaxSpeakerLabels: 4,\n    },\n  }));\n\n  // Poll for completion (in production, use SNS notification instead)\n  let status = 'IN_PROGRESS';\n  while (status === 'IN_PROGRESS') {\n    await new Promise(r => setTimeout(r, 5000));\n    const job = await client.send(new GetTranscriptionJobCommand({\n      TranscriptionJobName: jobName,\n    }));\n    status = job.TranscriptionJob!.TranscriptionJobStatus!;\n  }\n\n  return status; // 'COMPLETED' or 'FAILED'\n}`,
  },
  {
    id: 'textract',
    name: 'Textract',
    fullName: 'Amazon Textract',
    cat: 'ai_ml',
    level: 'beginner',
    icon: '\u{1F4C4}',
    short: 'Extracts text, tables, and forms from scanned documents and PDFs. Way beyond simple OCR.',
    analogy: 'A smart assistant that reads physical documents, understands the layout, and types it all into a spreadsheet for you.',
    detail: 'Textract uses ML to extract printed text, handwriting, and structured data (tables, forms) from documents. Unlike basic OCR, it understands document structure \u2014 it knows that "Name: John" is a key-value pair and that columns of numbers form a table.',
    useCases: [
      'Processing invoices and receipts',
      'Digitizing paper forms',
      'Extracting data from PDFs',
    ],
    keyTerms: {
      'Document Analysis': 'Extracts text, tables, and forms',
      'Expense Analysis': 'Specialized for receipts and invoices',
    },
    pricing: 'Free tier: 1K pages/month for 3 months. After: $1.50/1000 pages for text detection.',
    howItWorks:
      'Textract provides three tiers of document intelligence. The simplest, DetectDocumentText, performs OCR and returns every line and word with bounding box coordinates and confidence scores. The next tier, AnalyzeDocument, understands document structure: it identifies tables (rows, columns, cells) and forms (key-value pairs like "Date: 2024-01-15"). The top tier, AnalyzeExpense, is purpose-built for receipts and invoices \u2014 it extracts vendor name, line items, totals, and tax amounts into a normalized schema.\n\n' +
      'For a typical frontend workflow (like a document upload portal), the architecture looks like this: the user uploads a PDF or image through your React app to S3 via a presigned URL. An S3 event triggers a Lambda that calls Textract\'s AnalyzeDocument API. Textract returns a structured JSON response with Block objects \u2014 each block represents a page, line, word, table, cell, or key-value pair, linked together by parent-child relationships. Your Lambda transforms this into your application\'s data model and stores it in DynamoDB.\n\n' +
      'For multi-page documents (PDFs with more than one page), you must use the asynchronous APIs: StartDocumentAnalysis and GetDocumentAnalysis. These work like a job queue \u2014 you start the analysis, Textract processes the pages, and you retrieve results with pagination. SNS notifications tell you when processing is complete, so you do not need to poll. The async APIs support PDFs up to 3,000 pages.',
    gotchas: [
      'The synchronous API (AnalyzeDocument) only works on single-page documents. For multi-page PDFs, you must use the async API (StartDocumentAnalysis / GetDocumentAnalysis). This is the most common mistake when integrating Textract.',
      'Textract\'s response is a flat array of Block objects with relationship IDs, not a nested tree. Reconstructing a table or form from the raw response requires traversing these relationships. Use the @aws-sdk/client-textract helper utilities or the amazon-textract-response-parser library to simplify this.',
      'Image quality dramatically affects accuracy. Scanned documents below 150 DPI, skewed images, or photos taken at an angle will produce worse results. For best accuracy, recommend users scan at 300 DPI or use a document scanner app that auto-corrects perspective.',
      'Textract pricing differs by feature: plain text detection ($1.50/1K pages) is cheaper than table/form analysis ($15/1K pages) and expense analysis ($8/1K pages). Only call the analysis tier you actually need.',
    ],
    whenNotToUse: [
      'You just need basic text detection in photos (signs, license plates, product labels) \u2014 use Rekognition DetectText, which is simpler and cheaper for non-document images.',
      'Your documents are already digital and machine-readable (e.g., HTML, structured JSON, or text-layer PDFs) \u2014 use a standard PDF parser library instead. Textract is for when OCR or layout understanding is needed.',
      'You need to extract data from handwritten notes in real time during a video call \u2014 Textract is an async, document-at-a-time service, not a real-time handwriting recognition system.',
    ],
    relatedServices: ['s3', 'lambda', 'rekognition', 'dynamodb', 'step-functions', 'sns'],
    relatedGuides: [],
    cliExample:
      `# Detect text in a single-page document\naws textract detect-document-text \\\n  --document '{"S3Object":{"Bucket":"my-documents","Name":"form.png"}}' \\\n  --query 'Blocks[?BlockType==\`LINE\`].Text' \\\n  --output text\n\n# Analyze a document for tables and forms\naws textract analyze-document \\\n  --document '{"S3Object":{"Bucket":"my-documents","Name":"invoice.png"}}' \\\n  --feature-types '["TABLES","FORMS"]' \\\n  --query 'Blocks[?BlockType==\`KEY_VALUE_SET\`].{Type:EntityTypes[0],Text:Text}'`,
    cdkExample:
      `import * as cdk from 'aws-cdk-lib';\nimport * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';\nimport * as s3 from 'aws-cdk-lib/aws-s3';\nimport * as s3n from 'aws-cdk-lib/aws-s3-notifications';\nimport * as dynamodb from 'aws-cdk-lib/aws-dynamodb';\nimport * as iam from 'aws-cdk-lib/aws-iam';\n\nconst docsBucket = new s3.Bucket(this, 'Documents');\n\nconst resultsTable = new dynamodb.Table(this, 'TextractResults', {\n  partitionKey: { name: 'documentId', type: dynamodb.AttributeType.STRING },\n  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,\n});\n\nconst extractFn = new lambda.NodejsFunction(this, 'ExtractHandler', {\n  entry: 'lambda/extract-document.ts',\n  runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,\n  timeout: cdk.Duration.seconds(60),\n  environment: {\n    TABLE_NAME: resultsTable.tableName,\n  },\n});\n\nextractFn.addToRolePolicy(new iam.PolicyStatement({\n  actions: ['textract:AnalyzeDocument', 'textract:DetectDocumentText'],\n  resources: ['*'],\n}));\ndocsBucket.grantRead(extractFn);\nresultsTable.grantWriteData(extractFn);\n\n// Process documents on upload\ndocsBucket.addEventNotification(\n  s3.EventType.OBJECT_CREATED,\n  new s3n.LambdaDestination(extractFn),\n  { suffix: '.pdf' }\n);`,
    code:
      `// Extract tables and forms from a document\nimport { TextractClient, AnalyzeDocumentCommand } from '@aws-sdk/client-textract';\n\nconst client = new TextractClient({ region: 'us-east-1' });\n\nasync function extractDocument(bucket: string, key: string) {\n  const response = await client.send(new AnalyzeDocumentCommand({\n    Document: { S3Object: { Bucket: bucket, Name: key } },\n    FeatureTypes: ['TABLES', 'FORMS'],\n  }));\n\n  // Extract key-value pairs from forms\n  const keyBlocks = response.Blocks?.filter(\n    b => b.BlockType === 'KEY_VALUE_SET' && b.EntityTypes?.includes('KEY')\n  ) ?? [];\n\n  const formData: Record<string, string> = {};\n  for (const keyBlock of keyBlocks) {\n    const keyText = getBlockText(keyBlock, response.Blocks!);\n    const valueBlock = findValueBlock(keyBlock, response.Blocks!);\n    if (valueBlock) {\n      formData[keyText] = getBlockText(valueBlock, response.Blocks!);\n    }\n  }\n\n  return formData; // e.g. { "Name": "John Doe", "Date": "2024-01-15" }\n}\n\n// Helper: resolve child WORD blocks into text\nfunction getBlockText(block: any, allBlocks: any[]): string {\n  const childIds = block.Relationships\n    ?.find((r: any) => r.Type === 'CHILD')?.Ids ?? [];\n  return childIds\n    .map((id: string) => allBlocks.find(b => b.Id === id))\n    .filter((b: any) => b?.BlockType === 'WORD')\n    .map((b: any) => b.Text)\n    .join(' ');\n}\n\n// Helper: find the VALUE block linked to a KEY block\nfunction findValueBlock(keyBlock: any, allBlocks: any[]) {\n  const valueId = keyBlock.Relationships\n    ?.find((r: any) => r.Type === 'VALUE')?.Ids?.[0];\n  return allBlocks.find(b => b.Id === valueId);\n}`,
  },
]
