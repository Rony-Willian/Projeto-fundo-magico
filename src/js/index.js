document.addEventListener("DOMContentLoaded", function () {
	const form = document.querySelector(".form-group");
	const description = document.getElementById("description");
	const htmlCode = document.getElementById("html-code");
	const cssCode = document.getElementById("css-code");
	const preview = document.getElementById("preview-section");

	function setLoading(isLoading) {
		const button = document.getElementById("generate-btn");
		if (isLoading) {
			button.innerHTML = "Gerando Background...";
		} else {
			button.innerHTML = "Gerando Background Mágico";
		}
	}

	function applyGeneratePreview(html, css) {
		htmlCode.textContent = html;
		cssCode.textContent = css;

		preview.style.display = "block";
		preview.innerHTML = html;

		const existingStyle = document.getElementById("dynamic-style");
		if (existingStyle) {
			existingStyle.remove();
		}

		if (css) {
			const style = document.createElement("style");
			style.id = "dynamic-style";
			style.textContent = css;
			document.head.appendChild(style);
		}
	}

	form.addEventListener("submit", async function (event) {
		event.preventDefault();

		const descriptionValue = description.value.trim();

		if (!descriptionValue) {
			return;
		}

		setLoading(true);

		try {
			const response = await fetch("https://rony131.app.n8n.cloud/webhook/f2f36705-a8da-406a-b48d-3f572f57541f", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ descriptionValue }),
			});

			const data = await response.json();
            console.log(data);

			const html = data.html || "Nenhum código HTML retornado.";
			const css = data.css || "Nenhum código CSS retornado.";

			applyGeneratePreview(html, css);
		} catch (error) {
			console.error("Erro ao gerar o background:", error);
			htmlCode.textContent = "Erro ao gerar o HTML.";
			cssCode.textContent = "Erro ao gerar o CSS.";
			preview.innerHTML = "";
		} finally {
			setLoading(false);
		}
	});
});
