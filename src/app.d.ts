// See https://svelte.dev/docs/kit/types#app.d.ts

import type { UserResponse } from './types/api';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: NonNullable<UserResponse>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
