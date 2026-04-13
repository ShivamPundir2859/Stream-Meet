import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            setError('');
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                const result = await handleRegister(name, username, password);
                setName('');
                setUsername('');
                setPassword('');
                setMessage(result);
                setOpen(true);
                setFormState(0);
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAuth();
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />

            {/* Outermost wrapper — pure CSS flex, no MUI Grid breakpoint issues */}
            <div style={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
            }}>

                {/* ── Left: image panel ── */}
                <div style={{
                    flex: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#0d1b2a',
                }}>
                    <img
                        src="/loginImage.jpg"
                        alt="background"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </div>

                {/* ── Right: form panel ── */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                    boxShadow: '-4px 0 20px rgba(0,0,0,0.08)',
                }}>
                    <Box sx={{
                        width: '100%',
                        maxWidth: 420,
                        px: 5,
                        py: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 52, height: 52 }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        {/* Toggle */}
                        <Box sx={{
                            display: 'flex',
                            mt: 2,
                            mb: 1,
                            borderRadius: 2,
                            overflow: 'hidden',
                            border: '1.5px solid #1976d2',
                            width: '100%',
                        }}>
                            <Button
                                disableElevation
                                fullWidth
                                onClick={() => { setFormState(0); setError(''); }}
                                sx={{
                                    borderRadius: 0,
                                    py: 1.2,
                                    fontWeight: 700,
                                    bgcolor: formState === 0 ? '#1976d2' : 'transparent',
                                    color: formState === 0 ? '#fff' : '#1976d2',
                                    '&:hover': {
                                        bgcolor: formState === 0 ? '#1565c0' : 'rgba(25,118,210,0.08)',
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                disableElevation
                                fullWidth
                                onClick={() => { setFormState(1); setError(''); }}
                                sx={{
                                    borderRadius: 0,
                                    py: 1.2,
                                    fontWeight: 700,
                                    bgcolor: formState === 1 ? '#1976d2' : 'transparent',
                                    color: formState === 1 ? '#fff' : '#1976d2',
                                    '&:hover': {
                                        bgcolor: formState === 1 ? '#1565c0' : 'rgba(25,118,210,0.08)',
                                    },
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        {/* Fields */}
                        <Box sx={{ mt: 1, width: '100%' }} onKeyDown={handleKeyDown}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && (
                                <Box sx={{
                                    mt: 1, px: 2, py: 1,
                                    bgcolor: '#fff3f3',
                                    border: '1px solid #f5c2c2',
                                    borderRadius: 1,
                                }}>
                                    <p style={{ color: '#c0392b', margin: 0, fontSize: 14 }}>{error}</p>
                                </Box>
                            )}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                size="large"
                                disableElevation
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    fontWeight: 700,
                                    fontSize: 15,
                                    borderRadius: 2,
                                    bgcolor: '#1976d2',
                                    '&:hover': { bgcolor: '#1565c0' },
                                }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? 'Login' : 'Register'}
                            </Button>
                        </Box>
                    </Box>
                </div>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </ThemeProvider>
    );
}










// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { AuthContext } from '../contexts/AuthContext';
// import { Snackbar } from '@mui/material';

// const defaultTheme = createTheme();

// export default function Authentication() {
//     const [username, setUsername] = React.useState('');
//     const [password, setPassword] = React.useState('');
//     const [name, setName] = React.useState('');
//     const [error, setError] = React.useState('');
//     const [message, setMessage] = React.useState('');
//     const [formState, setFormState] = React.useState(0);
//     const [open, setOpen] = React.useState(false);
//     const { handleRegister, handleLogin } = React.useContext(AuthContext);

//     const handleAuth = async () => {
//         try {
//             if (formState === 0) {
//                 await handleLogin(username, password);
//             }
//             if (formState === 1) {
//                 const result = await handleRegister(name, username, password);
//                 setUsername('');
//                 setPassword('');
//                 setName('');
//                 setMessage(result);
//                 setOpen(true);
//                 setError('');
//                 setFormState(0);
//             }
//         } catch (err) {
//             console.log(err);
//             setError(err.message);  // ✅ fixed: was err.response.data.message
//         }
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Grid container component="main" sx={{ height: '100vh' }}>  {/* ✅ fixed */}
//                 <CssBaseline />

//                 {/* Left image panel */}
//                 <Grid
//                     item
//                     xs={false}
//                     md={6}
//                     sx={{
//                         position: 'relative',
//                         overflow: 'hidden',
//                         display: { xs: 'none', md: 'block' },  // ✅ hidden on mobile
//                     }}
//                 >
//                     <Box
//                         component="img"
//                         src="/loginImage.jpg"
//                         alt="Login illustration"
//                         sx={{
//                             position: 'absolute',  // ✅ fixed: prevents overflow
//                             top: 0,
//                             left: 0,
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover',
//                         }}
//                     />
//                 </Grid>

//                 {/* Right form panel */}
//                 <Grid
//                     item
//                     xs={12}
//                     md={6}
//                     component={Paper}
//                     elevation={6}
//                     square
//                     sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                 >
//                     <Box
//                         sx={{
//                             width: '100%',
//                             maxWidth: 440,
//                             py: 8,
//                             px: 4,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                             <LockOutlinedIcon />
//                         </Avatar>
//                         <div>
//                             <Button
//                                 variant={formState === 0 ? 'contained' : 'outlined'}
//                                 onClick={() => setFormState(0)}
//                             >
//                                 Sign In
//                             </Button>
//                             <Button
//                                 variant={formState === 1 ? 'contained' : 'outlined'}
//                                 onClick={() => setFormState(1)}
//                                 sx={{ ml: 1 }}
//                             >
//                                 Sign Up
//                             </Button>
//                         </div>
//                         <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
//                             {formState === 1 && (
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     label="Full Name"
//                                     value={name}
//                                     autoFocus
//                                     onChange={(e) => setName(e.target.value)}
//                                 />
//                             )}
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 label="Username"
//                                 value={username}
//                                 autoFocus={formState === 0}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 label="Password"
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             {error && <p style={{ color: 'red', margin: '4px 0' }}>{error}</p>}
//                             <Button
//                                 type="button"
//                                 fullWidth
//                                 variant="contained"
//                                 sx={{ mt: 3, mb: 2 }}
//                                 onClick={handleAuth}
//                             >
//                                 {formState === 0 ? 'Login' : 'Register'}
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Grid>
//             </Grid>
//             <Snackbar
//                 open={open}
//                 autoHideDuration={4000}
//                 onClose={() => setOpen(false)}
//                 message={message}
//             />
//         </ThemeProvider>
//     );
// }