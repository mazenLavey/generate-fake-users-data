import { createContext, useState } from 'react';
import { faker as fakerAR } from '@faker-js/faker/locale/ar';
import { faker as fakerEN } from '@faker-js/faker/locale/en';
import { faker as fakerRU } from '@faker-js/faker/locale/ru';
import { UserData, LocalizationType } from 'types/interfaces';
import { Faker } from '@faker-js/faker';

type Props = {
    children: React.ReactNode
}

type SelectedOptions = {
    seed: number,
    localization: LocalizationType,
    errorRate: number
}

type FakeDataContextType = {
    fakeUsers: UserData[],
    generateFakeUsers: (seeds: number, localization: LocalizationType, errorRate: number) => void,
    getMoreFakeUsers: (records: number) => void
}

const FakeDataContext = createContext<FakeDataContextType>({
    fakeUsers: [],
    generateFakeUsers: (seeds, localization, errorRate) => { },
    getMoreFakeUsers: (records) => { }
})

const FakeDataProvider: React.FC<Props> = ({ children }) => {
    const [fakeUsers, setFakeUsers] = useState<UserData[]>([])
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
        seed: 0,
        localization: 'en',
        errorRate: 0
    })


    const generateFakeUsers = (seed: number, localization: LocalizationType, errorRate: number) => {
        const fakerInstance = getFakerInstance(localization);
        setSelectedOptions(() => {
            return { seed, localization, errorRate }
        });

        const users: UserData[] = [];
        fakerInstance.seed(seed)

        for (let i = 0; i < 20; i++) {
            const user = generateUser(fakerInstance, errorRate);
            users.push(user);
        }

        setFakeUsers(users);
    }

    const getMoreFakeUsers = (records: number) => {
        const fakerInstance = getFakerInstance(selectedOptions.localization);

        const users: UserData[] = [];
        fakerInstance.seed(selectedOptions.seed)

        const endIndex = fakeUsers.length + records;

        for (let i = 0; i < endIndex; i++) {
            users.push(generateUser(fakerInstance, selectedOptions.errorRate));
        }

        setFakeUsers(users);
    }

    const getFakerInstance = (localization: LocalizationType) => {
        switch (localization) {
            case 'ar':
                return fakerAR;
            case 'ru':
                return fakerRU;
            default:
                return fakerEN;
        }
    };

    const generateUser = (fake: Faker, errorRate: number = 0) => {
        const user: UserData = {
            id: fake.string.uuid(),
            userName: fake.person.fullName(),
            userAddress: `${fake.location.streetAddress({ useFullAddress: true })}, ${fake.location.city()}`,
            userPhoneNumber: fake.phone.number(),
        }

        const integerPart: number = Math.floor(errorRate);
        const fractionalPart: number = errorRate % 1;
        const arrayOfOnes = Array.from({ length: integerPart }, () => 1);

        const errorsAmount = [...arrayOfOnes, fractionalPart]

        for(let i =0; i < errorsAmount.length; i++) {
            if (Math.random() < errorsAmount[i]) {
                // 0 = delete, 1 = random postion, 2 = shift char 
                const errorType = Math.floor(Math.random() * 3); 
    
                if (errorType === 0) {
                    let randomPos = Math.floor(Math.random() * user.userName.length);
                    user.userName = user.userName.slice(0, randomPos) + user.userName.slice(randomPos + 1);
    
                    randomPos = Math.floor(Math.random() * user.userAddress.length);
                    user.userAddress = user.userAddress.slice(0, randomPos) + user.userAddress.slice(randomPos + 1);
    
                    const phonePos = Math.floor(Math.random() * user.userPhoneNumber.length);
                    user.userPhoneNumber = user.userPhoneNumber.slice(0, phonePos) + user.userPhoneNumber.slice(phonePos + 1);
                } else if (errorType === 1) {
                    let randomPos = Math.floor(Math.random() * user.userName.length);
                    const randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                    user.userName = user.userName.slice(0, randomPos) + randomChar + user.userName.slice(randomPos);
    
                    randomPos = Math.floor(Math.random() * user.userAddress.length);
                    const addressChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                    user.userAddress = user.userAddress.slice(0, randomPos) + addressChar + user.userAddress.slice(randomPos);
    
                    const phonePos = Math.floor(Math.random() * user.userPhoneNumber.length);
                    const phoneChar = String.fromCharCode(Math.floor(Math.random() * 10) + 48);
                    user.userPhoneNumber = user.userPhoneNumber.slice(0, phonePos) + phoneChar + user.userPhoneNumber.slice(phonePos);
                } else {
                    let randomPos = Math.floor(Math.random() * (user.userName.length - 1));
                    user.userName =
                        user.userName.slice(0, randomPos) +
                        user.userName.slice(randomPos + 1, randomPos + 2) +
                        user.userName.slice(randomPos, randomPos + 1) +
                        user.userName.slice(randomPos + 2);
    
                    randomPos = Math.floor(Math.random() * (user.userAddress.length - 1));
                    user.userAddress =
                        user.userAddress.slice(0, randomPos) +
                        user.userAddress.slice(randomPos + 1, randomPos + 2) +
                        user.userAddress.slice(randomPos, randomPos + 1) +
                        user.userAddress.slice(randomPos + 2);
    
                    const phonePos = Math.floor(Math.random() * (user.userPhoneNumber.length - 1));
                    user.userPhoneNumber =
                        user.userPhoneNumber.slice(0, phonePos) +
                        user.userPhoneNumber.slice(phonePos + 1, phonePos + 2) +
                        user.userPhoneNumber.slice(phonePos, phonePos + 1) +
                        user.userPhoneNumber.slice(phonePos + 2);
                }
            }
        }

        return user;
    }

    return (
        <FakeDataContext.Provider value={{ fakeUsers, generateFakeUsers, getMoreFakeUsers }}>
            {children}
        </FakeDataContext.Provider>
    )
}

export { FakeDataContext, FakeDataProvider };