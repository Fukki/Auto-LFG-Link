module.exports = function AutoLFGLink(mod) {
	const cmd = mod.command || mod.require.command; let interval, spamLFG = 1;
	mod.hook('S_RETURN_TO_LOBBY', 'raw', () => {clearInterval(interval);});
	function sendLink () {if (spamLFG > 1) {for(let i = 1; i <= spamLFG; i++) _send();} else {_send();}}
	function _send() {mod.send('C_REQUEST_PARTY_MATCH_LINK', 1, {});}
	cmd.add('autolfg', (delay, spam) => {
		delay = Number(delay); spamLFG = Number(spam);
		if (delay > 0) {
			if (delay < 3000) delay = 3000; if (spamLFG < 1) spamLFG = 1;
			clearInterval(interval); _send(); interval = setInterval(sendLink, delay);
			cmd.message('Auto LFG Link set to: ' + (spamLFG > 0 ? spamLFG + '/' : '1/') + delay + ' ms.');
		} else {
			clearInterval(interval);
			cmd.message('Auto LFG Link has stopped.');
		}
	});
}