# 🧱 MelonRuntime project tree

Once generated, a melon project must contain the following files (this is a standard convention, <br> all files can be adapted and changed, it contains everything needed to bundle packages and adapt <br> the code to be executed by MelonRuntime):

<div class="code-block">- src/<br>-- <b>index.ts</b><br>- <b>melon.json</b><br>- <b>package.json</b><br>- <b>tsconfig.json</b><br>- <b>.babelrc</b><br>- <b>.gitignore</b><br>- <b>README.md</b></div>

## Understanding Layers

The build, bundle and execution of a Melon application is divided into layers, which means that each <br> part performs an important operation for the final execution of the application.

<img class="md-img" width="50%" src="https://i.imgur.com/U84Pp4f.png">