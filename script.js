function abrirSinopse(sinopse) {
    const popup = document.getElementById("popup-sinopse");
    const conteudo = document.getElementById("conteudo-sinopse");

    conteudo.textContent = sinopse;
    popup.classList.remove("hidden");
}

function fecharPopup() {
    const popup = document.getElementById("popup-sinopse");
    popup.classList.add("hidden");
}

function selecionarHorario(id, nome, horario, sala) {
    const poster = `filme${id}.jpg`;
    localStorage.setItem('filme', JSON.stringify({id, nome, horario, sala, poster}));
    window.location.href = "assentos.html";
}

function selecionarAssento(assentoId) {
    const assento = document.querySelector(`.assento[onclick="selecionarAssento('${assentoId}')"]`);
    let assentosSelecionados = JSON.parse(localStorage.getItem('assentos')) || [];

    if (assento.classList.contains('selecionado')) {
        assento.classList.remove('selecionado');
        assentosSelecionados = assentosSelecionados.filter(a => a !== assentoId);
    } else {
        assento.classList.add('selecionado');
        assentosSelecionados.push(assentoId);
    }

    localStorage.setItem('assentos', JSON.stringify(assentosSelecionados));
}

function carregarAssentosSelecionados() {
    const assentosSelecionados = JSON.parse(localStorage.getItem('assentos')) || [];

    assentosSelecionados.forEach(assentoId => {
        const assento = document.querySelector(`.assento[onclick="selecionarAssento('${assentoId}')"]`);
        if (assento) {
            assento.classList.add('selecionado');
        }
    });
}

function irParaAperitivos() {
    window.location.href = "aperitivos.html";
}

function irParaPagamento() {
    const aperitivos = [];
    if (document.getElementById('refrigerante').checked) aperitivos.push('Refrigerante');
    if (document.getElementById('agua').checked) aperitivos.push('Água');
    if (document.getElementById('suco').checked) aperitivos.push('Suco');
    if (document.getElementById('pipoca-doce').checked) aperitivos.push('Pipoca Doce');
    if (document.getElementById('chocolate').checked) aperitivos.push('Chocolate');
    if (document.getElementById('bala-de-goma').checked) aperitivos.push('Bala de Goma');
    if (document.getElementById('combo1').checked) aperitivos.push('Combo 1');
    if (document.getElementById('combo2').checked) aperitivos.push('Combo 2');
    localStorage.setItem('aperitivos', JSON.stringify(aperitivos));
    window.location.href = "pagamento.html";
}

function selecionarPagamento(metodo) {
    localStorage.setItem('pagamento', metodo);
}

function irParaRevisao() {
    window.location.href = "revisao.html";
}

function carregarRevisao() {
    const filme = JSON.parse(localStorage.getItem('filme'));
    const assentosSelecionados = JSON.parse(localStorage.getItem('assentos')) || [];
    const aperitivos = JSON.parse(localStorage.getItem('aperitivos')) || [];
    const pagamento = localStorage.getItem('pagamento');

    document.getElementById('filme-selecionado').textContent = `${filme.nome} - Horário: ${filme.horario} - Sala: ${filme.sala}`;
    document.getElementById('poster-filme').src = filme.poster;

    document.getElementById('assento-selecionado').textContent = assentosSelecionados.join(', ');
    document.getElementById('aperitivos-selecionados').textContent = aperitivos.length ? aperitivos.join(', ') : 'Nenhum aperitivo selecionado';
    document.getElementById('pagamento-selecionado').textContent = pagamento || 'Método de pagamento não selecionado';
}

function confirmarCompra() {
    alert("Compra confirmada! Obrigado por escolher o Cinema de Terror.");
    localStorage.clear();
    window.location.href = "index.html";
}

function cancelarCompra() {
    alert("Compra cancelada.");
    localStorage.clear();
    window.location.href = "index.html";
}
