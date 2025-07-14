# Viam Data Pipelines Sandbox

Raw web application with a basic setup to explore Viam datapipelines.

## Setup .env Environment

1. Create `.env` file by copying the `.env.sample` and setting the values according to your environment

## Create Datapipeline

1. login with Viam cli `viam login`
2. Look at `pipeline.sh` which includes the commands needed to manage datapipelines
3. You can then update the `.env`file with the values you have retrieved such as the pipeline id
4. If you want to use the .env variables in your shell commands you can simply run `source .env`

## Setup Weapplication

1. `npm run install`
2. Start the application wiht `npm run dev`
3. Open the developer console (there is currently no output on the webfrontend!)
