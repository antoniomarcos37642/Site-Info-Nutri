class HealthQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.categories = {
            alimentacao: { score: 0, maxScore: 0 },
            exercicio: { score: 0, maxScore: 0 },
            sono: { score: 0, maxScore: 0 },
            hidratacao: { score: 0, maxScore: 0 },
            stress: { score: 0, maxScore: 0 },
            habitos: { score: 0, maxScore: 0 }
        };
        
        this.questions = [
            
            {
                question: "Quantas porções de frutas e vegetais você consome por dia?",
                options: [
                    { text: "Menos de 2 porções", value: 1, category: "alimentacao" },
                    { text: "2-3 porções", value: 2, category: "alimentacao" },
                    { text: "4-5 porções", value: 3, category: "alimentacao" },
                    { text: "6 ou mais porções", value: 4, category: "alimentacao" }
                ]
            },
            {
                question: "Com que frequência você consome alimentos processados ou fast food?",
                options: [
                    { text: "Diariamente", value: 1, category: "alimentacao" },
                    { text: "3-4 vezes por semana", value: 2, category: "alimentacao" },
                    { text: "1-2 vezes por semana", value: 3, category: "alimentacao" },
                    { text: "Raramente ou nunca", value: 4, category: "alimentacao" }
                ]
            },
            {
                question: "Você consome grãos integrais regularmente?",
                options: [
                    { text: "Nunca", value: 1, category: "alimentacao" },
                    { text: "Raramente", value: 2, category: "alimentacao" },
                    { text: "Às vezes", value: 3, category: "alimentacao" },
                    { text: "Regularmente", value: 4, category: "alimentacao" }
                ]
            },
            {
                question: "Quantas refeições você faz por dia?",
                options: [
                    { text: "1-2 refeições", value: 1, category: "alimentacao" },
                    { text: "3 refeições", value: 2, category: "alimentacao" },
                    { text: "4-5 refeições", value: 3, category: "alimentacao" },
                    { text: "6 ou mais refeições pequenas", value: 4, category: "alimentacao" }
                ]
            },
            {
                question: "Você consome proteínas magras (peixe, frango, legumes) regularmente?",
                options: [
                    { text: "Nunca", value: 1, category: "alimentacao" },
                    { text: "Raramente", value: 2, category: "alimentacao" },
                    { text: "Às vezes", value: 3, category: "alimentacao" },
                    { text: "Regularmente", value: 4, category: "alimentacao" }
                ]
            },
            {
                question: "Com que frequência você consome açúcar refinado e doces?",
                options: [
                    { text: "Diariamente", value: 1, category: "alimentacao" },
                    { text: "3-4 vezes por semana", value: 2, category: "alimentacao" },
                    { text: "1-2 vezes por semana", value: 3, category: "alimentacao" },
                    { text: "Raramente ou nunca", value: 4, category: "alimentacao" }
                ]
            },
            {
                question: "Você consome gorduras saudáveis (azeite, abacate, nozes) regularmente?",
                options: [
                    { text: "Nunca", value: 1, category: "alimentacao" },
                    { text: "Raramente", value: 2, category: "alimentacao" },
                    { text: "Às vezes", value: 3, category: "alimentacao" },
                    { text: "Regularmente", value: 4, category: "alimentacao" }
                ]
            },
            {
                question: "Você evita alimentos com conservantes e aditivos químicos?",
                options: [
                    { text: "Nunca evito", value: 1, category: "alimentacao" },
                    { text: "Raramente evito", value: 2, category: "alimentacao" },
                    { text: "Às vezes evito", value: 3, category: "alimentacao" },
                    { text: "Sempre evito", value: 4, category: "alimentacao" }
                ]
            },
            
            
            {
                question: "Quantos minutos de atividade física moderada você faz por semana?",
                options: [
                    { text: "Menos de 30 minutos", value: 1, category: "exercicio" },
                    { text: "30-60 minutos", value: 2, category: "exercicio" },
                    { text: "60-150 minutos", value: 3, category: "exercicio" },
                    { text: "Mais de 150 minutos", value: 4, category: "exercicio" }
                ]
            },
            {
                question: "Com que frequência você faz exercícios de força (musculação, pilates)?",
                options: [
                    { text: "Nunca", value: 1, category: "exercicio" },
                    { text: "Menos de 1 vez por semana", value: 2, category: "exercicio" },
                    { text: "1-2 vezes por semana", value: 3, category: "exercicio" },
                    { text: "3 ou mais vezes por semana", value: 4, category: "exercicio" }
                ]
            },
            {
                question: "Você faz alongamentos regularmente?",
                options: [
                    { text: "Nunca", value: 1, category: "exercicio" },
                    { text: "Raramente", value: 2, category: "exercicio" },
                    { text: "Às vezes", value: 3, category: "exercicio" },
                    { text: "Regularmente", value: 4, category: "exercicio" }
                ]
            },
            {
                question: "Quantos passos você dá por dia em média?",
                options: [
                    { text: "Menos de 3.000 passos", value: 1, category: "exercicio" },
                    { text: "3.000-5.000 passos", value: 2, category: "exercicio" },
                    { text: "5.000-8.000 passos", value: 3, category: "exercicio" },
                    { text: "Mais de 8.000 passos", value: 4, category: "exercicio" }
                ]
            },
            {
                question: "Você pratica atividades ao ar livre regularmente?",
                options: [
                    { text: "Nunca", value: 1, category: "exercicio" },
                    { text: "Raramente", value: 2, category: "exercicio" },
                    { text: "Às vezes", value: 3, category: "exercicio" },
                    { text: "Regularmente", value: 4, category: "exercicio" }
                ]
            },
            
            
            {
                question: "Quantas horas de sono você tem por noite em média?",
                options: [
                    { text: "Menos de 5 horas", value: 1, category: "sono" },
                    { text: "5-6 horas", value: 2, category: "sono" },
                    { text: "7-8 horas", value: 3, category: "sono" },
                    { text: "Mais de 8 horas", value: 4, category: "sono" }
                ]
            },
            {
                question: "Você tem um horário regular para dormir e acordar?",
                options: [
                    { text: "Nunca", value: 1, category: "sono" },
                    { text: "Raramente", value: 2, category: "sono" },
                    { text: "Às vezes", value: 3, category: "sono" },
                    { text: "Sempre", value: 4, category: "sono" }
                ]
            },
            {
                question: "Você usa dispositivos eletrônicos antes de dormir?",
                options: [
                    { text: "Sempre", value: 1, category: "sono" },
                    { text: "Frequentemente", value: 2, category: "sono" },
                    { text: "Às vezes", value: 3, category: "sono" },
                    { text: "Raramente ou nunca", value: 4, category: "sono" }
                ]
            },
            {
                question: "Você se sente descansado ao acordar?",
                options: [
                    { text: "Nunca", value: 1, category: "sono" },
                    { text: "Raramente", value: 2, category: "sono" },
                    { text: "Às vezes", value: 3, category: "sono" },
                    { text: "Sempre", value: 4, category: "sono" }
                ]
            },
            
            
            {
                question: "Quantos copos de água você bebe por dia?",
                options: [
                    { text: "Menos de 4 copos", value: 1, category: "hidratacao" },
                    { text: "4-6 copos", value: 2, category: "hidratacao" },
                    { text: "7-8 copos", value: 3, category: "hidratacao" },
                    { text: "Mais de 8 copos", value: 4, category: "hidratacao" }
                ]
            },
            {
                question: "Você evita bebidas açucaradas e refrigerantes?",
                options: [
                    { text: "Nunca evito", value: 1, category: "hidratacao" },
                    { text: "Raramente evito", value: 2, category: "hidratacao" },
                    { text: "Às vezes evito", value: 3, category: "hidratacao" },
                    { text: "Sempre evito", value: 4, category: "hidratacao" }
                ]
            },
            {
                question: "Você bebe água regularmente ao longo do dia?",
                options: [
                    { text: "Nunca", value: 1, category: "hidratacao" },
                    { text: "Raramente", value: 2, category: "hidratacao" },
                    { text: "Às vezes", value: 3, category: "hidratacao" },
                    { text: "Regularmente", value: 4, category: "hidratacao" }
                ]
            },
            
            
            {
                question: "Como você avalia seu nível de stress diário?",
                options: [
                    { text: "Muito alto", value: 1, category: "stress" },
                    { text: "Alto", value: 2, category: "stress" },
                    { text: "Moderado", value: 3, category: "stress" },
                    { text: "Baixo", value: 4, category: "stress" }
                ]
            },
            {
                question: "Você pratica técnicas de relaxamento (meditação, respiração)?",
                options: [
                    { text: "Nunca", value: 1, category: "stress" },
                    { text: "Raramente", value: 2, category: "stress" },
                    { text: "Às vezes", value: 3, category: "stress" },
                    { text: "Regularmente", value: 4, category: "stress" }
                ]
            },
            {
                question: "Você tem tempo para atividades de lazer e hobbies?",
                options: [
                    { text: "Nunca", value: 1, category: "stress" },
                    { text: "Raramente", value: 2, category: "stress" },
                    { text: "Às vezes", value: 3, category: "stress" },
                    { text: "Regularmente", value: 4, category: "stress" }
                ]
            },
            
           
            {
                question: "Você fuma ou consome tabaco?",
                options: [
                    { text: "Sim, regularmente", value: 1, category: "habitos" },
                    { text: "Sim, ocasionalmente", value: 2, category: "habitos" },
                    { text: "Não, mas já fumei", value: 3, category: "habitos" },
                    { text: "Nunca fumei", value: 4, category: "habitos" }
                ]
            },
            {
                question: "Você consome álcool regularmente?",
                options: [
                    { text: "Sim, diariamente", value: 1, category: "habitos" },
                    { text: "Sim, algumas vezes por semana", value: 2, category: "habitos" },
                    { text: "Sim, ocasionalmente", value: 3, category: "habitos" },
                    { text: "Não consumo", value: 4, category: "habitos" }
                ]
            }
        ];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showWelcome();
    }
    
    bindEvents() {
        document.getElementById('startQuiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('nextQuestion').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prevQuestion').addEventListener('click', () => this.prevQuestion());
        document.getElementById('retakeQuiz').addEventListener('click', () => this.resetQuiz());
        document.getElementById('shareResults').addEventListener('click', () => this.shareResults());
    }
    
    showWelcome() {
        document.getElementById('quizWelcome').style.display = 'block';
        document.getElementById('quizQuestion').style.display = 'none';
        document.getElementById('quizResults').style.display = 'none';
    }
    
    startQuiz() {
        document.getElementById('quizWelcome').style.display = 'none';
        document.getElementById('quizQuestion').style.display = 'block';
        this.currentQuestion = 0;
        this.showQuestion();
    }
    
    showQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionText = document.getElementById('questionText');
        const questionOptions = document.getElementById('questionOptions');
        const progressText = document.getElementById('progressText');
        const progressFill = document.getElementById('progressFill');
        const nextBtn = document.getElementById('nextQuestion');
        const prevBtn = document.getElementById('prevQuestion');
        
       
        questionText.textContent = question.question;
        
        
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Pergunta ${this.currentQuestion + 1} de ${this.questions.length}`;
        
        
        questionOptions.innerHTML = '';
        
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.type = 'button';
            optionElement.className = 'option-item';
            optionElement.textContent = option.text;
            optionElement.addEventListener('click', (event) => this.selectOption(optionElement, option, event));
            questionOptions.appendChild(optionElement);
        });
        
        
        prevBtn.style.display = this.currentQuestion > 0 ? 'block' : 'none';
        nextBtn.disabled = true;
        
        
        if (this.answers[this.currentQuestion]) {
            const selectedOption = questionOptions.children[this.answers[this.currentQuestion].optionIndex];
            if (selectedOption) {
                selectedOption.classList.add('selected');
                nextBtn.disabled = false;
            }
        }
    }
    
    selectOption(element, option, event) {
        
        event.preventDefault();
        event.stopPropagation();
        
       
        
        const options = document.querySelectorAll('.option-item');
        options.forEach(opt => opt.classList.remove('selected'));
        
     
        element.classList.add('selected');
        
      
        this.answers[this.currentQuestion] = {
            optionIndex: Array.from(element.parentNode.children).indexOf(element),
            value: option.value,
            category: option.category
        };
        
      
        document.getElementById('nextQuestion').disabled = false;
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion();
        } else {
            this.showResults();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
        }
    }
    
    showResults() {
        document.getElementById('quizQuestion').style.display = 'none';
        document.getElementById('quizResults').style.display = 'block';
        
        this.calculateResults();
        this.displayResults();
    }
    
    calculateResults() {
     
        Object.keys(this.categories).forEach(category => {
            this.categories[category].score = 0;
            this.categories[category].maxScore = 0;
        });
        
      
        this.answers.forEach(answer => {
            if (answer && answer.category) {
                this.categories[answer.category].score += answer.value;
                this.categories[answer.category].maxScore += 4; 
            }
        });
        
        
        this.score = Object.values(this.categories).reduce((total, category) => total + category.score, 0);
        const maxScore = Object.values(this.categories).reduce((total, category) => total + category.maxScore, 0);
        this.scorePercentage = Math.round((this.score / maxScore) * 100);
    }
    
    displayResults() {
        const scoreNumber = document.getElementById('scoreNumber');
        const resultTitle = document.getElementById('resultTitle');
        const resultDescription = document.getElementById('resultDescription');
        const breakdownCategories = document.getElementById('breakdownCategories');
        const recommendationsList = document.getElementById('recommendationsList');
        
       
        scoreNumber.textContent = this.scorePercentage;
        
      
        let title, description;
        if (this.scorePercentage >= 80) {
            title = "Excelente Saúde!";
            description = "Parabéns! Você tem hábitos muito saudáveis. Continue mantendo esse estilo de vida equilibrado.";
        } else if (this.scorePercentage >= 60) {
            title = "Boa Saúde";
            description = "Você tem uma boa base de saúde, mas há algumas áreas que podem ser melhoradas.";
        } else if (this.scorePercentage >= 40) {
            title = "Saúde Moderada";
            description = "Sua saúde está em um nível moderado. Há várias oportunidades de melhoria.";
        } else {
            title = "Saúde Precisa de Atenção";
            description = "É importante fazer mudanças significativas em seu estilo de vida para melhorar sua saúde.";
        }
        
        resultTitle.textContent = title;
        resultDescription.textContent = description;
        
        
        breakdownCategories.innerHTML = '';
        Object.entries(this.categories).forEach(([category, data]) => {
            if (data.maxScore > 0) {
                const percentage = Math.round((data.score / data.maxScore) * 100);
                const categoryName = this.getCategoryName(category);
                
                const categoryElement = document.createElement('div');
                categoryElement.className = 'category-item';
                categoryElement.innerHTML = `
                    <span class="category-name">${categoryName}</span>
                    <div class="category-score">
                        <div class="score-bar">
                            <div class="score-bar-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span class="score-value">${percentage}%</span>
                    </div>
                `;
                breakdownCategories.appendChild(categoryElement);
            }
        });
        
    
        recommendationsList.innerHTML = '';
        const recommendations = this.generateRecommendations();
        recommendations.forEach(rec => {
            const recElement = document.createElement('div');
            recElement.className = 'recommendation-item';
            recElement.innerHTML = `
                <div class="recommendation-icon">
                    <i class="${rec.icon}"></i>
                </div>
                <div class="recommendation-text">
                    <strong>${rec.title}</strong><br>
                    ${rec.description}
                </div>
            `;
            recommendationsList.appendChild(recElement);
        });
    }
    
    getCategoryName(category) {
        const names = {
            alimentacao: 'Alimentação',
            exercicio: 'Exercício',
            sono: 'Sono',
            hidratacao: 'Hidratação',
            stress: 'Gestão de Stress',
            habitos: 'Hábitos'
        };
        return names[category] || category;
    }
    
    generateRecommendations() {
        const recommendations = [];
        
        Object.entries(this.categories).forEach(([category, data]) => {
            if (data.maxScore > 0) {
                const percentage = Math.round((data.score / data.maxScore) * 100);
                
                if (percentage < 60) {
                    switch (category) {
                        case 'alimentacao':
                            recommendations.push({
                                icon: 'fas fa-apple-alt',
                                title: 'Melhore sua Alimentação',
                                description: 'Consuma mais frutas, vegetais e grãos integrais. Reduza alimentos processados e açúcares refinados.'
                            });
                            break;
                        case 'exercicio':
                            recommendations.push({
                                icon: 'fas fa-running',
                                title: 'Aumente a Atividade Física',
                                description: 'Faça pelo menos 150 minutos de exercício moderado por semana. Inclua atividades de força e alongamento.'
                            });
                            break;
                        case 'sono':
                            recommendations.push({
                                icon: 'fas fa-bed',
                                title: 'Melhore seu Sono',
                                description: 'Mantenha um horário regular de sono, evite dispositivos antes de dormir e crie um ambiente propício ao descanso.'
                            });
                            break;
                        case 'hidratacao':
                            recommendations.push({
                                icon: 'fas fa-tint',
                                title: 'Aumente a Hidratação',
                                description: 'Beba pelo menos 8 copos de água por dia e evite bebidas açucaradas.'
                            });
                            break;
                        case 'stress':
                            recommendations.push({
                                icon: 'fas fa-spa',
                                title: 'Gerencie o Stress',
                                description: 'Pratique técnicas de relaxamento como meditação, respiração profunda e reserve tempo para lazer.'
                            });
                            break;
                        case 'habitos':
                            recommendations.push({
                                icon: 'fas fa-ban',
                                title: 'Evite Hábitos Nocivos',
                                description: 'Evite fumar e limite o consumo de álcool. Procure ajuda profissional se necessário.'
                            });
                            break;
                    }
                }
            }
        });
        
       
        if (recommendations.length === 0) {
            recommendations.push({
                icon: 'fas fa-star',
                title: 'Continue Assim!',
                description: 'Você está no caminho certo! Mantenha seus hábitos saudáveis e continue se cuidando.'
            });
        }
        
        return recommendations;
    }
    
    resetQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        Object.keys(this.categories).forEach(category => {
            this.categories[category].score = 0;
            this.categories[category].maxScore = 0;
        });
        this.showWelcome();
    }
    
    shareResults() {
        const text = `Acabei de fazer o Quiz de Saúde e obtive ${this.scorePercentage}% de pontuação! Descubra o quão saudável você é também!`;
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: 'Quiz de Saúde',
                text: text,
                url: url
            });
        } else {
           
            navigator.clipboard.writeText(`${text} ${url}`).then(() => {
                alert('Resultado copiado para a área de transferência!');
            });
        }
    }
}


function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

       
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new HealthQuiz();
    initMobileMenu();
});
