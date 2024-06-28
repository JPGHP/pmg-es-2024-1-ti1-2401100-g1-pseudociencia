document.addEventListener("DOMContentLoaded", function() {
    const postsContainer = document.getElementById("posts");
    const postInfo = document.getElementById("post-info");
    const postContent = document.getElementById("post-content");

    let OBJ = localStorage.getItem("posts");
    let posts = JSON.parse(OBJ);
    
    if (postsContainer) {
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.style.cursor = "pointer"; // Adiciona o estilo de cursor para indicar que é clicável
            
            // Adiciona o evento de clique ao postElement
            postElement.addEventListener("click", () => {
                window.location.href = `post.html?id=${post.id}`;
            });
            
            const postTitle = document.createElement("h3");
            const postLink = document.createElement("a");
            postLink.className = "caixaA";
            postLink.href = `post.html?id=${post.id}`;
            postLink.textContent = post.titulo;
            postTitle.appendChild(postLink);
            
            const postContentElement = document.createElement("p");
            const maxLength = 100; // Limite de caracteres
            let postContentText = post.conteudo;
            if (postContentText.length > maxLength) {
                postContentText = postContentText.slice(0, maxLength) + '...';
            }
            postContentElement.textContent = postContentText;
            
            postElement.appendChild(postTitle);
            postElement.appendChild(postContentElement);
            
            // Remove a imagem do post
            // if (post.imagem) {
            //     const postImage = document.createElement("img");
            //     postImage.src = `./Assets/Img/${post.imagem}`;
            //     postImage.alt = post.titulo;
            //     postElement.appendChild(postImage);
            // }
            
            postsContainer.appendChild(postElement);
        });
    } else if (postInfo && postContent) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));

        const post = posts.find(p => p.id === postId);

        if (post) {
            const today = new Date();

            const infoHTML = `
                <div class="post-info">
                    <div class="info-label">Nome:</div>
                    <div>${post.autor}</div>
                    <div class="info-label" style="margin-left: 20px;">Data:</div>
                    <div> ${today.toLocaleDateString()} </div>
                </div>
            `;

            const contentHTML = `
                <h2 style="color: #2e97b7;">${post.titulo}</h2>
                <p>${post.conteudo}</p>
            `;

            postInfo.innerHTML = infoHTML;
            postContent.innerHTML = contentHTML;

            // Adiciona a imagem após o texto do post
            if (post.imagem) {
                const postImage = document.createElement("img");
                postImage.src = post.imagem;
                postImage.alt = post.titulo;
                postContent.appendChild(postImage);
            }
        }
    }
});
