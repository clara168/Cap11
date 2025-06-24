const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    usuario_id: { type: Number, required: true },
    acao: { type: String, required: true },
    detalhes: { type: Schema.Types.Mixed },
    ip: { type: String },
    dispositivo: { type: String }
}, {
    timestamps: { createdAt: 'criado_em', updatedAt: false }
});

module.exports = mongoose.model("Log", LogSchema);