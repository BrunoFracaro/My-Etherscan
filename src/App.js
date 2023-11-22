import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '10 users included',
      '2 GB of storage',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {

  const [blockNumber, setBlockNumber] = React.useState();
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState();
  const [cards, setCards] = React.useState(tiers);

  React.useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  const fillFunction = (value) => {
    setSearch(value)

    console.log('value', value.length)

    if (value.length == 66) {
      setStatus('block')
      getblock(value)
      return
    }

    if (value.length == 42) {
      setStatus('address')
      address(value)
      return
    }
    setStatus('invalid')
    return
  }

  const getblock = async (blockId) => {
    const block = await alchemy.core.getBlockWithTransactions(blockId)

    console.log('block', block)

    const newCards = [
      {
        title: 'Gas',
        price: '0',
        description: [
          `Base fee per gas: ${parseInt(block.baseFeePerGas._hex, 16)}`,
          `Gas limit: ${parseInt(block.gasLimit._hex, 16)}`,
          `Gas used: ${parseInt(block.gasUsed._hex, 16)}`,
        ],
        buttonText: 'https://ethereum.org/en/developers/docs/gas/',
        buttonVariant: 'View explanation',
      },
      {
        title: 'Information',
        price: '15',
        description: [
          `Number: ${block.number}`,
          `Miner: ${block.miner}`,
          `Parent hash: ${block.parentHash}`,
          `Timestamp: ${new Date(block.timestamp).toDateString()}`,
        ],
        buttonText: `https://etherscan.io/block/${block.number}`,
        buttonVariant: 'View Block',
      },
      {
        title: 'Extra',
        price: '30',
        description: [
          `Dificulty: ${block.difficulty}`,
          `Extra data: ${block.extraData}`,
        ],
        buttonText: `https://etherscan.io/block/${block.number}`,
        buttonVariant: 'View Block',
      },
    ]

    setCards(newCards)
  }

  const address = async (toAddress) => {
    //Assign the contract address to a variable
    // let toAddress = "0x1E6E8695FAb3Eb382534915eA8d7Cc1D1994B152";

    //The response fetches the transactions the specified addresses.
    let response = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: "0x0000000000000000000000000000000000000000",
      toAddress: toAddress,
      excludeZeroValue: true,
      category: ["erc721", "erc1155"],
    })

    //Logging the response to the console
    console.log(response)
    const newCards = [
      {
        title: 'Last transaction',
        price: '0',
        description: [
          `Block Number: ${parseInt(response.transfers[response.transfers.length-1].blockNum, 16)}`,
          `Asset: ${response.transfers[response.transfers.length-1].asset}`,
          `Category: ${response.transfers[response.transfers.length-1].category}`,
        ],
        buttonText: `https://etherscan.io/block/${parseInt(response.transfers[response.transfers.length-1].blockNum, 16)}`,
        buttonVariant: 'View Block',
      },
      {
        title: 'Information',
        price: '15',
        description: [
          `tokenId: ${response.transfers[response.transfers.length-1].tokenId}`,
          `UniqueId: ${response.transfers[response.transfers.length-1].uniqueId}`,
          `Hash: ${response.transfers[response.transfers.length-1].hash}`,
        ],
        buttonText: `https://etherscan.io/block/${parseInt(response.transfers[response.transfers.length-1].blockNum, 16)}`,
        buttonVariant: 'View Block',
      },
      {
        title: 'Extra',
        price: '30',
        description: [
          `tokenId: ${response.transfers[response.transfers.length-1].tokenId}`,
          `Asset: ${response.transfers[response.transfers.length-1].asset}`,
          `Category: ${response.transfers[response.transfers.length-1].category}`,
        ],
        buttonText: `https://etherscan.io/block/${parseInt(response.transfers[response.transfers.length-1].blockNum, 16)}`,
        buttonVariant: 'View Block',
      },
    ]

    setCards(newCards)
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Bruno's Etherscan
          </Typography>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Connect Metamask
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <TextField
          placeholder='type a block hash or and address...'
          value={search}
          id="standard-basic"
          variant="standard"
          onChange={(e) => fillFunction(e.target.value)}
          sx={{ fontSize: 24, width: 500, marginBottom: 2 }}
          inputProps={{ style: { fontSize: search.length > 26 ? 20 : 32, fontStyle: 'italic' } }} // font size of input text
        />
        {status == 'invalid' && status != null ?
          <Typography variant="h5" align="center" color='#f00' component="p">
            Invalid input
          </Typography>
          :
          undefined
        }
        {status == 'address' && status != null ?
          <Typography variant="h5" align="center" color='#0a0' component="p">
            This is an address
          </Typography>
          :
          undefined
        }
        {status == 'block' && status != null ?
          <Typography variant="h5" align="center" color='#0a0' component="p">
            This is a block hash
          </Typography>
          :
          undefined
        }
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {cards.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={'contained'} onClick={() => window.open(tier.buttonText, '_blank', 'noreferrer')}>
                    {tier.buttonVariant}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </ThemeProvider>
  );
}
