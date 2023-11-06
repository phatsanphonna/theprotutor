import { redirect, type Actions } from '@sveltejs/kit';
import { FileType } from 'database';
import { uploadFile } from 'storage';
import JSZip from 'jszip';

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const { db } = locals;
		const form = await request.formData();

		const name = form.get('name') as string;
		const type = form.get('type') as FileType;
		const file = form.get('file') as File;
		let location = form.get('location') as string;

		if (type === FileType.VIDEO) {
			const material = await db.material.create({
				data: {
					location: location,
					name,
					type: type
				}
			});

			throw redirect(303, `/files/${material.id}?redirected=1`);
		}
	
		const fileBuffer = await file.arrayBuffer();

		const ext = file.name.split('.').pop() || '';
		const contentType = file.type;

		if (type === FileType.FILE) {
			const material = await db.material.create({
				data: {
					file: {
						create: {
							data: Buffer.from(fileBuffer),
							name: name,
							contentType: contentType,
							ext
						}
					},
					name,
					type: type
				}
			});

			throw redirect(303, `/files/${material.id}?redirected=1`);
		} else {
			const material = await db.material.create({
				data: {
					location: location,
					name,
					type: type
				}
			});

			throw redirect(303, `/files/${material.id}?redirected=1`);
		}
	}
};
