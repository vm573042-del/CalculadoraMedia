function alternarTipoMedia() {
    const tipo = document.getElementById('tipoMedia').value;
    const pesosLabels = document.querySelectorAll('.peso-label');
    
    if (tipo === 'ponderada') {
        pesosLabels.forEach(el => el.classList.remove('hidden'));
    } else {
        pesosLabels.forEach(el => el.classList.add('hidden'));
    }
}

function calcularMedia() {
    const t1 = parseFloat(document.getElementById('trimestre1').value);
    const t2 = parseFloat(document.getElementById('trimestre2').value);
    const t3 = parseFloat(document.getElementById('trimestre3').value);
    const mediaCorte = parseFloat(document.getElementById('mediaCorte').value) || 6.0;
    const tipo = document.getElementById('tipoMedia').value;

    // Validação básica
    if (isNaN(t1) || isNaN(t2) || isNaN(t3)) {
        alert("Por favor, preencha as notas de todos os três trimestres.");
        return;
    }

    if (t1 < 0 || t1 > 10 || t2 < 0 || t2 > 10 || t3 < 0 || t3 > 10) {
        alert("As notas devem estar entre 0.0 e 10.0.");
        return;
    }

    let mediaFinal = 0;

    if (tipo === 'aritmetica') {
        mediaFinal = (t1 + t2 + t3) / 3;
    } else {
        const p1 = parseFloat(document.getElementById('peso1').value) || 1;
        const p2 = parseFloat(document.getElementById('peso2').value) || 1;
        const p3 = parseFloat(document.getElementById('peso3').value) || 2;

        const somaNotas = (t1 * p1) + (t2 * p2) + (t3 * p3);
        const somaPesos = p1 + p2 + p3;
        mediaFinal = somaNotas / somaPesos;
    }

    // Exibir resultados
    const container = document.getElementById('resultadoContainer');
    const elValor = document.getElementById('valorMedia');
    const elBadge = document.getElementById('badgeStatus');
    const elMsgRec = document.getElementById('mensagemRecuperacao');

    container.classList.remove('hidden');
    elValor.textContent = mediaFinal.toFixed(2);

    // Regras de Aprovação
    if (mediaFinal >= mediaCorte) {
        elBadge.textContent = "Aprovado(a)";
        elBadge.className = "badge badge-aprovado";
        elMsgRec.classList.add('hidden');
    } else {
        elBadge.textContent = "Recuperação";
        elBadge.className = "badge badge-reprovado";
        
        let notaRec = (mediaCorte * 2) - mediaFinal;
        notaRec = notaRec > 10 ? 10 : (notaRec < 0 ? 0 : notaRec);
        
        elMsgRec.classList.remove('hidden');
        elMsgRec.innerHTML = `⚠️ Você ficou abaixo da média. Para ser aprovado na recuperação, precisará tirar pelo menos <strong style="color: #f8fafc;">${notaRec.toFixed(1)}</strong>.`;
    }
}

function limparCampos() {
    document.getElementById('trimestre1').value = '';
    document.getElementById('trimestre2').value = '';
    document.getElementById('trimestre3').value = '';
    document.getElementById('resultadoContainer').classList.add('hidden');
}