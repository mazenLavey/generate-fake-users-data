import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserData } from 'types/interfaces';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


type Props = {
    usersData?: UserData[]
}

const DataTable: React.FC<Props> = ({ usersData }) => {
    return (
        <TableContainer component={Paper} className='fedeIn-animation'>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell sx={{ cursor: "help" }} title='Random identifier'>Id</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell>Phone Number</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersData?.map((user, index) => (
                        <StyledTableRow key={user.id}>
                            <StyledTableCell width={30}>{index + 1}</StyledTableCell>
                            <StyledTableCell
                                sx={{
                                    maxWidth: 60,
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    cursor: "help"
                                }}
                                title={user.id}
                            >
                                {user.id}
                            </StyledTableCell>
                            <StyledTableCell>{user.userName}</StyledTableCell>
                            <StyledTableCell>{user.userAddress}</StyledTableCell>
                            <StyledTableCell>{user.userPhoneNumber}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default DataTable;