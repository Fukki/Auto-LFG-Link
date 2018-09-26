module.exports = function AutoLFGLink(mod) {
    const cmd = mod.command || mod.require.command; let interval, spamLFG = 1;
    function sendLink () {for(let i = 1; i <= spamLFG; i++) mod.send('C_REQUEST_PARTY_MATCH_LINK', 1, {});}
	mod.hook('S_RETURN_TO_LOBBY', 'raw', () => {clearInterval(interval);});
    cmd.add('autolfg', (delay, spam) => {
        delay = Number(delay); spamLFG = Number(spam);
		if (delay > 0) {
			if (spamLFG < 1) spamLFG = 1;
            interval = setInterval(sendLink, delay);
            cmd.message('Auto LFG Link set to: ' + (spamLFG > 0 ? spamLFG + '/' : '1/') + delay + ' ms.');
        } else {
            clearInterval(interval);
            cmd.message('Auto LFG Link has stopped.');
        }
    });
}