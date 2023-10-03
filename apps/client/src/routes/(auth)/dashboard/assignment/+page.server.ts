import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';
import type { File } from 'database'

type User = {
    id: string
    userAuth: {
        email: string,
        profilePicture: string
    }
    userAuthId: string
    firstname: string
    lastname: string
    nickname: string
    assignment: {
        isFinished: boolean
        expireDate: Date
        assignDate: Date | null
        lesson: { title: string, materials: File[] }
        id: string
    }[]
    studentId: string
}

export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/student`);
    const data = await response.json() as User;

    return { assignments: data.assignment };
};