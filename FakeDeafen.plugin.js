/**
 * @name FakeDeafen
 * @author Ahlawat
 * @authorId 887483349369765930
 * @version 0.0.1
 * @description trick your friens with this
 * @website https://wife-ruby.ml
 * @source https://github.com/Tharki-God/BetterDiscordPlugins
 * @updateUrl https://raw.githubusercontent.com/Tharki-God/BetterDiscordPlugins/master/FakeDeafen.plugin.js
 */
module.exports = (() => {
	const config = {
		info: {
			name: "FakeDeafen",
			authors: [
				{
					name: "Ahlawat",
					discord_id: "887483349369765930",
					github_username: "Tharki-God",
				},
			],
			version: "0.0.1",
			description:
				"trick your friens with this",
			github: "https://github.com/Tharki-God/BetterDiscordPlugins",
			github_raw:
				"https://raw.githubusercontent.com/Tharki-God/BetterDiscordPlugins/master/FakeDeafen.plugin.js",
		},
		main: "FakeDeafen.plugin.js",
	};

	return !global.ZeresPluginLibrary
		? class {
			constructor() {
				this._config = config;
			}
			getName() {
				return config.info.name;
			}
			getAuthor() {
				return config.info.authors.map((a) => a.name).join(", ");
			}
			getDescription() {
				return config.info.description;
			}
			getVersion() {
				return config.info.version;
			}
			load() {

				BdApi.showConfirmationModal(
					"Library Missing",
					`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`,
					{
						confirmText: "Download Now",
						cancelText: "Cancel",
						onConfirm: () => {
							require("request").get(
								"https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",
								async (error, response, body) => {
									if (error)
										return require("electron").shell.openExternal(
											"https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js"
										);
									await new Promise((r) =>
										require("fs").writeFile(
											require("path").join(
												BdApi.Plugins.folder,
												"0PluginLibrary.plugin.js"
											),
											body,
											r
										)
									);
								}
							);
						},
					}
				);
			}
			start() { }
			stop() { }
		}
		: (([Plugin, Api]) => {
			const plugin = (Plugin, Api) => {
				const { Patcher, DiscordModules, Settings, PluginUtilities } = Api;
				return class FakeDeafen extends Plugin {
					onStart() {
						    var text = new TextDecoder("utf-8");

WebSocket.prototype.original = WebSocket.prototype.send;
WebSocket.prototype.send = function(data) {
    if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
        if (text.decode(data).includes("self_deaf")) {
            console.log("found mute/deafen");
            data = data.replace('"self_mute":false', 'NiceOneDiscord');
            console.log("Activated");
        }
    }
    WebSocket.prototype.original.apply(this, [data]);
}
window.BdApi.alert("success",`Now stop plugin!, After you turned ON the plugin `);
					}
					onStop() {
						window.BdApi.alert("success",`You cant join any other voice channels , for that you will have to Reload discord!`);
						
					}
				};
			};
			return plugin(Plugin, Api);
		})(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
