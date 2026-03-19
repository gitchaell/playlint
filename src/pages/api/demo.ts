import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
	// Simulate server delay
	await new Promise((resolve) => setTimeout(resolve, 800));

	const htmlResponse = `
		<div class="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400 border border-green-500/20 animate-fade-in">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
			<span class="text-sm font-medium">Server Action Completed Successfully!</span>
		</div>
	`;

	return new Response(htmlResponse, {
		status: 200,
		headers: {
			'Content-Type': 'text/html',
		},
	});
};
