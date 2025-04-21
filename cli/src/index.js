const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");
const { Command } = require("commander");
const { exec } = require("child_process");

const program = new Command();
const noesisDir = path.join(os.homedir(), ".noesis");
const configPath = path.join(noesisDir, "node.json");
const tracesDir = path.join("C:", "Noesis", "traces");

program
  .name("noesis")
  .description("Noēsis CLI - Decentralized intelligence node")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize your local Noēsis node")
  .action(() => {
    if (!fs.existsSync(noesisDir)) {
      fs.mkdirSync(noesisDir);
    }

    const nodeConfig = {
      persona: "Prime Reflection",
      wallet: "0xYOUR_WALLET_ADDRESS_HERE",
      initialized_at: new Date().toISOString()
    };

    fs.writeFileSync(configPath, JSON.stringify(nodeConfig, null, 2));
    console.log("✅ Noēsis node initialized at:", configPath);
  });

program
  .command("persona")
  .description("Set or update your persona name")
  .requiredOption("--name <name>", "Name of your persona")
  .action((options) => {
    if (!fs.existsSync(configPath)) {
      console.error("❌ Node not initialized. Run 'noesis init' first.");
      process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    config.persona = options.name;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    console.log(`✅ Persona updated to: ${options.name}`);
  });

program
  .command("reflect")
  .description("Write a new reflection")
  .action(() => {
    if (!fs.existsSync(configPath)) {
      console.error("❌ Node not initialized. Run 'noesis init' first.");
      process.exit(1);
    }

    if (!fs.existsSync(tracesDir)) {
      fs.mkdirSync(tracesDir);
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("🧠 Enter your reflection: ", (answer) => {
      const timestamp = new Date().toISOString();
      const filename = `reflection-${timestamp.replace(/[:.]/g, "-")}.json`;

      const reflection = {
        timestamp,
        persona: JSON.parse(fs.readFileSync(configPath, "utf-8")).persona,
        content: answer
      };

      const filepath = path.join(tracesDir, filename);
      fs.writeFileSync(filepath, JSON.stringify(reflection, null, 2));

      console.log("✅ Reflection saved to:", filepath);
      rl.close();
    });
  });

program
  .command("show")
  .description("Display current node status")
  .action(() => {
    if (!fs.existsSync(configPath)) {
      console.error("❌ Node not initialized. Run 'noesis init' first.");
      process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    const files = fs.existsSync(tracesDir) ? fs.readdirSync(tracesDir).filter(f => f.endsWith(".json")) : [];
    const reflectionCount = files.length;
    const latest = reflectionCount > 0 ? files.sort().slice(-1)[0] : null;

    console.log("\n🧬 Noēsis Node Status");
    console.log("Persona:", config.persona);
    console.log("Wallet:", config.wallet);
    console.log("Initialized:", config.initialized_at);
    console.log("Reflections:", reflectionCount);
    if (latest) {
      console.log("Latest Reflection:", latest.replace("reflection-", "").replace(".json", ""));
    }
    console.log();
  });

program
  .command("share")
  .description("Upload a reflection to IPFS")
  .requiredOption("--file <filename>", "Path to the reflection file to upload")
  .action((options) => {
    const filePath = path.join(tracesDir, options.file);

    if (!fs.existsSync(filePath)) {
      console.error("❌ File not found:", filePath);
      process.exit(1);
    }

    console.log("🚀 Uploading to IPFS...");
    exec(`ipfs add "${filePath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ IPFS upload failed:", error.message);
        return;
      }
      if (stderr) {
        console.error("❌ IPFS stderr:", stderr);
        return;
      }

      const lines = stdout.trim().split("\n");
      const lastLine = lines[lines.length - 1];
      const [_, cid, filename] = lastLine.split(" ");
      console.log(`✅ Uploaded! IPFS CID: ${cid}`);
    });
  });

program.parse();
