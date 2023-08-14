import { useContext } from 'react';
import DataTable from "components/DataTable";
import ToolsBar from "components/ToolsBar";
import { FakeDataContext } from 'context/FakeDataContext';
import Container from '@mui/material/Container';
import InfiniteScroll from 'react-infinite-scroll-component';
import emptyTable from './assets/empty-table.png';
import './index.css';


const Home: React.FC = () => {
    const { fakeUsers, getMoreFakeUsers } = useContext(FakeDataContext)

    const fetchMoreData = () => {
        getMoreFakeUsers(10);
    };

    return (
        <main className='Home'>
            <Container>
                <div className='Home__inner'>
                    <ToolsBar />
                    {fakeUsers.length > 0 ?
                        <InfiniteScroll
                            dataLength={fakeUsers.length}
                            next={fetchMoreData}
                            hasMore={true}
                            loader={null}
                            endMessage={<p>No more data to load</p>}
                        >
                            <DataTable usersData={fakeUsers} />
                        </InfiniteScroll>
                        :
                        <div className='Home__img-container fedeIn-animation'>
                            <img className='Home__img' src={emptyTable} alt="empty table" width={400} />
                        </div>
                    }
                </div>
            </Container>
        </main>
    )
}

export default Home;