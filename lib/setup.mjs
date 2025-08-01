import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const data = {
	description: "My octo projects",
	githubUsername: "octocat",
	avatarUrl: "",
	displayName: "",
	email: "",
	socials: {},
};

(async () => {
	dotenv.config({ path: path.join(process.cwd(), '.env') });
	dotenv.config({ path: path.join(process.cwd(), '.env.local') });

	if (!process.env.GH_TOKEN) {
		throw new Error('Please set GH_TOKEN in .env or .env.local');
	}
	if (process.env.IS_TEMPLATE === 'false') {
		return;
	}

	const dataPath = path.join(process.cwd(), 'data.json');
	const rawData = await fs.readFile(dataPath, 'utf-8');
	const dataJson = JSON.parse(rawData);

	if (dataJson.githubUsername !== 'jirihofman') {
		return;
	}

	console.log('⚠️  This is still a template. Please update data.json file and set IS_TEMPLATE to false in .env.local to use this template');
	console.log('⚙️  Reverting personal data to template data...');

	const faviconPath = path.join(process.cwd(), 'public', 'favicon.ico');
	await fs.unlink(faviconPath).catch(() => {}); // skip error if file not found
	console.log('⚙️  Removed favicon.ico');

	const newData = { ...dataJson, ...data };
	await fs.writeFile(dataPath, JSON.stringify(newData, null, 4));

	console.log('⚙️  Reverted to template data (using octocat).');
})();
