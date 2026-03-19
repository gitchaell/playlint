/**
 * Declarative Actions System
 *
 * Intercepts clicks on elements with `data-action` attributes and
 * performs fetch requests, swapping the HTML response into `data-target`.
 */

function initActions() {
	document.addEventListener('click', async (e) => {
		const target = e.target as HTMLElement;
		const actionEl = target.closest('[data-action]') as HTMLElement | null;

		if (!actionEl) return;
		e.preventDefault();

		const url = actionEl.getAttribute('data-action');
		const method = (
			actionEl.getAttribute('data-method') || 'GET'
		).toUpperCase();
		const targetSelector = actionEl.getAttribute('data-target');
		const swapMethod = actionEl.getAttribute('data-swap') || 'inner'; // inner, outer, append, prepend

		if (!url) return;

		const targetContainer = targetSelector
			? document.querySelector(targetSelector)
			: actionEl;

		if (!targetContainer) {
			console.warn(`Action target '${targetSelector}' not found.`);
			return;
		}

		// Optional: Add a loading state class
		actionEl.classList.add('is-loading');
		actionEl.setAttribute('disabled', 'true');

		try {
			const response = await fetch(url, {
				method,
				headers: {
					'X-Requested-With': 'XMLHttpRequest', // Identify as AJAX request
				},
			});

			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);

			const html = await response.text();

			switch (swapMethod) {
				case 'outer':
					targetContainer.outerHTML = html;
					break;
				case 'prepend':
					targetContainer.insertAdjacentHTML('afterbegin', html);
					break;
				case 'append':
					targetContainer.insertAdjacentHTML('beforeend', html);
					break;
				default:
					targetContainer.innerHTML = html;
					break;
			}
		} catch (error) {
			console.error('Action failed:', error);
			// Ideally swap in an error template or trigger a toast here
		} finally {
			actionEl.classList.remove('is-loading');
			actionEl.removeAttribute('disabled');
		}
	});
}

// Initialize on first load
document.addEventListener('DOMContentLoaded', initActions);

// Re-initialize after Astro view transitions
document.addEventListener('astro:page-load', () => {
	// If the script was re-executed by View Transitions we don't need to do anything
	// However, if the event listener needs re-attaching, do it here.
	// Since we attach to 'document', it should persist across transitions,
	// but attaching in page-load ensures it works in all scenarios.
});
