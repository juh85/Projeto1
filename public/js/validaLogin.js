// Validação de email no frontend
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para realizar login
async function fazerLogin(email, senha) {
    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Importante para enviar cookies da sessão
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();
        
        if (data.success) {
            // Login bem-sucedido
            console.log('Usuário logado:', data.usuario);
            
            // Redirecionar para a área administrativa ou página desejada
            window.location.href = './areaAdm.html';
            
            return true;
        } else {
            // Login falhou
            alert(data.message || 'Erro ao fazer login');
            return false;
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor. Verifique se o servidor está rodando.');
        return false;
    }
}

// Função para fazer logout
async function fazerLogout() {
    try {
        const response = await fetch('http://localhost:3001/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const data = await response.json();
        
        if (data.success) {
            alert('Logout realizado com sucesso!');
            window.location.href = './login.html';
        } else {
            alert(data.message || 'Erro ao fazer logout');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

// Função para verificar se o usuário está logado
async function verificarLogin() {
    try {
        const response = await fetch('http://localhost:3001/verificar-login', {
            method: 'GET',
            credentials: 'include' 
        });

        const data = await response.json();
        
        if (data.logado) {
            console.log('Usuário está logado:', data.usuario);
            return data.usuario;
        } else {
            console.log('Usuário não está logado');
            return null;
        }
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        return null;
    }
}

// Exemplo de uso com um formulário de login
// Adicione esta função quando tiver um formulário HTML
function configurarFormularioLogin() {
    const formLogin = document.getElementById('formLogin');
    
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const senhaInput = document.getElementById('senha');
            
            const email = emailInput.value.trim();
            const senha = senhaInput.value;
            
            // Validar email
            if (!validarEmail(email)) {
                alert('Por favor, insira um email válido!');
                emailInput.focus();
                return;
            }
            
            // Validar senha
            if (senha.length < 4) {
                alert('A senha deve ter pelo menos 4 caracteres!');
                senhaInput.focus();
                return;
            }
            
            // Fazer login
            await fazerLogin(email, senha);
        });
    }
}

// Função para validar campos em tempo real
function configurarValidacaoCampos() {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            
            if (email && !validarEmail(email)) {
                this.classList.add('error');
                mostrarErro(this, 'Por favor, insira um email válido!');
            } else {
                this.classList.remove('error');
                this.classList.add('success');
                removerErro(this);
            }
        });
    }
    
    if (senhaInput) {
        senhaInput.addEventListener('blur', function() {
            const senha = this.value;
            
            if (senha && senha.length < 4) {
                this.classList.add('error');
                mostrarErro(this, 'A senha deve ter pelo menos 4 caracteres!');
            } else if (senha) {
                this.classList.remove('error');
                this.classList.add('success');
                removerErro(this);
            }
        });
    }
}

function mostrarErro(input, mensagem) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    
    if (small) {
        small.innerText = mensagem;
        formControl.className = 'form-control error';
    }
}

function removerErro(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    
    if (small) {
        small.innerText = '';
        formControl.className = 'form-control success';
    }
}

// Auto-configurar quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', configurarFormularioLogin);
    document.addEventListener('DOMContentLoaded', configurarValidacaoCampos);
} else {
    configurarFormularioLogin();
    configurarValidacaoCampos();
}

