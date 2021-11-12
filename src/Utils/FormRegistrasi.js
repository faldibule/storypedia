export const FormRegistrasi = [
    {
        label: 'Nama',
        name: 'nama',
        type: 'text',
        placeholder: 'Your Name',
        validation: {
            required: 'Wajib Diisi!',
            pattern: {
                value: /^[a-zA-Z ]+$/,
                message: 'Hanya Boleh Huruf'
            },
            maxLength: {
                value: 20,
                message: 'Maksimal 20 Karakter'
            }
        }
    },
    {
        label: 'Username',
        name: 'username',
        type: 'text',
        placeholder: 'Your Username',
        validation: {
            required: 'Wajib Diisi!',
            pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Hanya Boleh Angka Dan Huruf. Tidak boleh Spasi'
            },
            maxLength: {
                value: 12,
                message: 'Maksimal 12 Karakter'
            }
        }
    },
    {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'Your Email',
        validation: {
            required: 'Wajib Diisi!',
            pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Email Anda Tidak Valid'
            },
        }
    },
    {
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: 'Your Password',
        validation: {
            required: 'Wajib Diisi!',
            pattern: {
                value:  /^[a-zA-Z0-9]+$/,
                message: 'Hanya Boleh Angka Dan Huruf'
            },
            minLength: {
                value: 8,
                message: 'Minimal 8 Karakter'
            },
            maxLength: {
                value: 12,
                message: 'Maximal 12 Karakter'
            }
        }
    },
    {
        label: 'Repeat Password',
        placeholder: 'Reapet Your Password',
        name: 'r_password',
        validation: {
            required: 'Wajib Diisi!',
        }
    },
]