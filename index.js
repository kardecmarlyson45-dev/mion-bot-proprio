const { default: makeWASocket, useMultiFileAuthState, delay } = require('@whiskeysockets/baileys');

async function iniciar() {
    const { state, saveCreds } = await useMultiFileAuthState('sessao');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ["Windows", "Chrome", "120.0.0.0"]
    });

    if (!sock.authState.creds.registered) {
        await delay(5000); 
        try {
            const code = await sock.requestPairingCode("5591991029553");
            console.log("\n==============================");
            console.log("SEU CODIGO EH: " + code);
            console.log("==============================\n");
        } catch (e) { console.log("Erro ao gerar."); }
    }

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', (u) => {
        if (u.connection === 'open') console.log('MION CONECTADO COM SUCESSO!');
    });
}
iniciar();
