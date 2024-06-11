document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const startButton = document.getElementById('start-button');
    const finishModal = document.getElementById('finish-modal');
    const prizesButton = document.getElementById('prizes-button');
    const cards = document.querySelectorAll('.card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0; // Para contar os pares correspondentes

    startButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prizesButton.addEventListener('click', () => {
        window.location.href = 'prizes.html'; // Redireciona para a página de prêmios
    });

    // Função para virar carta
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        hasFlippedCard = false;
        checkForMatch();
    }

    // Função que checa se as cartas são iguais
    function checkForMatch() {
        if (firstCard.dataset.card === secondCard.dataset.card) {
            disableCards();
            matchedPairs++;
            if (matchedPairs === cards.length / 2) {
                setTimeout(() => {
                    finishModal.style.display = 'flex';
                }, 1000); // Aguarda 1 segundo antes de exibir a modal de finalização
            }
            return;
        }

        unflipCards();
    }

    // Função que desabilita as cartas
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    // Função que desvira as cartas
    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    // Função que reseta o tabuleiro
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Função que embaralha as cartas
    (function shuffle() {
        cards.forEach((card) => {
            let randomPosition = Math.floor(Math.random() * cards.length);
            card.style.order = randomPosition;
        });
    })();

    // Adiciona evento de clique na carta
    cards.forEach((card) => {
        card.addEventListener('click', flipCard);
    });
});
