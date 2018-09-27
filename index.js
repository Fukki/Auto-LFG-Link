module.exports = function AutoLFGLink(mod) {
	const cmd = mod.command || mod.require.command; let interval = null, spamLFG = 1;
	function sendLink () {if (spamLFG > 1) {for(let i = 1; i <= spamLFG; i++) _send();} else {_send();}}
	function clearTimer() {if (interval) {clearInterval(interval); interval = null;}}
	function _send() {mod.send('C_REQUEST_PARTY_MATCH_LINK', 1, {});}
	mod.hook('S_RETURN_TO_LOBBY', 'raw', () => {clearTimer();});
	cmd.add('autolfg', (...arg) => {
		if (arg[0]) {
			switch (arg[0].toLowerCase()) {
				case 'party': postLFG(arg, 0); break;
				case 'raid': postLFG(arg, 1); break;
				default: if (arg[0]) arg[0] = Number(arg[0]); if (arg[1]) spamLFG = Number(arg[1]); if (arg[0] > 0) {
					if (arg[0] < 3000) arg[0] = 3000; if (spamLFG < 1) spamLFG = 1;
					clearTimer(); _send(); interval = setInterval(sendLink, arg[0]);
					msg('Auto LFG Link set to: ' + (spamLFG > 0 ? spamLFG + '/' : '1/') + arg[0] + ' ms.');} break;
			}
		} else {
			clearTimer(); msg('Auto LFG Link has stopped.');
		}
	});
	function msg(msg) {cmd.message(msg);}
	function postLFG(arg, raid) {
		let msg = ''; for (n in arg) msg = (n > 1 ? msg + ' ' + arg[n]:arg[n]);
		mod.send('C_REGISTER_PARTY_INFO', 1, {message: msg, isRaid: raid});
	}
}