---
---

const categories = {
  {% assign all_categories = "" | split: "" %}
  {% for post in site.projects %}
    {% for cat in post.categories %}
      {% unless all_categories contains cat %}
        {% assign all_categories = all_categories | push: cat %}
      {% endunless %}
    {% endfor %}
  {% endfor %}

  {% for cat in all_categories %}
    {{ cat | replace: " ", "_" }}: [
      {% for post in site.projects %}
        {% if post.categories contains cat %}
          {
            url: "{{ site.baseurl }}{{ post.url }}",
            title: "{{ post.title }}",
            date: "{{ post.date | default: '' }}"
          },
        {% endif %}
      {% endfor %}
    ],
  {% endfor %}
};

window.onload = function () {
  const categoryButtons = document.querySelectorAll(".category");
  if (!categoryButtons.length) return;

  categoryButtons.forEach(category => {
    category.addEventListener("click", function (e) {
      const key = e.target.innerText.replace(" ", "_");
      const posts = categories[key];
      if (!posts) return;

      let html = "";
      posts.forEach(post => {
        html += `
          <a class="modal-article" href="${post.url}">
            <h4>${post.title}</h4>
          </a>
        `;
      });

      document.querySelector("#category-modal-title").innerText = e.target.innerText;
      document.querySelector("#category-modal-content").innerHTML = html;
      document.querySelector("#category-modal-bg").classList.add("open");
      document.querySelector("#category-modal").classList.add("open");
    });
  });

  document.querySelector("#category-modal-bg")?.addEventListener("click", function () {
    document.querySelector("#category-modal-title").innerText = "";
    document.querySelector("#category-modal-content").innerHTML = "";
    document.querySelector("#category-modal-bg").classList.remove("open");
    document.querySelector("#category-modal").classList.remove("open");
  });
};
