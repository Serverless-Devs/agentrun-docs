(function () {
  function processImage(img) {
    if (!img || !img.alt) return;
    // 已处理则跳过
    if (img.dataset.altProcessed === '1') return;

    const captionText = img.alt;

    // 如果父元素本身就是 figure 且包含 figcaption，则仅确保类名和内容
    const parent = img.parentElement;
    if (parent && parent.tagName === 'FIGURE') {
      parent.classList.add('img-with-caption');
      let fc = parent.querySelector('figcaption.img-alt-text');
      if (!fc) {
        fc = document.createElement('figcaption');
        fc.className = 'img-alt-text';
        parent.appendChild(fc);
      }
      fc.textContent = captionText;
      img.dataset.altProcessed = '1';
      return;
    }

    // 如果图片被单独包在 <p> 且只有图片，替换为 figure
    if (parent && parent.tagName === 'P' && parent.children.length === 1) {
      const figure = document.createElement('figure');
      figure.className = 'img-with-caption';
      parent.replaceWith(figure);
      figure.appendChild(img);
      const fc = document.createElement('figcaption');
      fc.className = 'img-alt-text';
      fc.textContent = captionText;
      figure.appendChild(fc);
      img.dataset.altProcessed = '1';
      return;
    }

    // 否则在图片后插入一个 figcaption（保存在 figure 里更语义，但避免破坏复杂 DOM）
    const figure = document.createElement('figure');
    figure.className = 'img-with-caption';
    const fc = document.createElement('figcaption');
    fc.className = 'img-alt-text';
    fc.textContent = captionText;

    // 将 img 移入 figure，替换原位置
    const next = img.nextSibling;
    const wrapperInserted = (() => {
      try {
        img.parentElement.insertBefore(figure, next);
        figure.appendChild(img);
        figure.appendChild(fc);
        return true;
      } catch (e) {
        return false;
      }
    })();

    if (!wrapperInserted) {
      // 兜底：直接插入 caption
      img.parentElement.insertBefore(fc, next);
    }
    img.dataset.altProcessed = '1';
  }

  function insertAltCaptions(root = document) {
    const imgs = root.querySelectorAll(
      '.theme-doc-markdown img[alt], .markdown img[alt]'
    );
    imgs.forEach(processImage);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () =>
      insertAltCaptions(document)
    );
  } else {
    insertAltCaptions(document);
  }

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (
          node.matches &&
          (node.matches('.theme-doc-markdown') || node.matches('.markdown'))
        ) {
          insertAltCaptions(node);
        } else if (node.querySelector) {
          const nested = node.querySelectorAll(
            '.theme-doc-markdown img[alt], .markdown img[alt]'
          );
          if (nested && nested.length) {
            nested.forEach(processImage);
          }
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
