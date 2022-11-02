import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Center,
  VStack,
  Heading,
  Spinner,
  Text,
  Input,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  useClaimConditions,
  useContract,
  useSetClaimConditions,
} from "@thirdweb-dev/react";
import { ERC1155_ADDRESS, USDT_ADDRESS } from "../../utils/consts";
import { ClaimConditionInput } from "@thirdweb-dev/sdk";
import { useEffect, useState, useRef } from "react";

const SetClaimingConditionModal = ({ targetERC1155 }) => {
  const [isSetting, setIsSetting] = useState(false);
  const [isSaved, setIsSaved] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const [claimConditionAll, setClaimConditionAll] = useState<
    ClaimConditionInput[]
  >([
    {
      quantityLimitPerTransaction: "unlimited",
      startTime: new Date(),
      price: 0,
      currencyAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      maxQuantity: "unlimited",
      waitInSeconds: "0",
    },
    {
      quantityLimitPerTransaction: "unlimited",
      startTime: new Date(),
      price: 0,
      currencyAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      maxQuantity: "unlimited",
      waitInSeconds: "0",
    },
    {
      quantityLimitPerTransaction: "unlimited",
      startTime: new Date(),
      price: 0,
      currencyAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      maxQuantity: "unlimited",
      waitInSeconds: "0",
    },
    {
      quantityLimitPerTransaction: "unlimited",
      startTime: new Date(),
      price: 0,
      currencyAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      maxQuantity: "unlimited",
      waitInSeconds: "0",
    },
    {
      quantityLimitPerTransaction: "unlimited",
      startTime: new Date(),
      price: 0,
      currencyAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      maxQuantity: "unlimited",
      waitInSeconds: "0",
    },
  ]);
  const refs = useRef<HTMLFormElement[]>([]);

  const handleSave = (e, id) => {
    e.preventDefault();

    // console.log("ref", refs);
    // console.log(refs.current[id]);
    const form = refs.current[id];
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // console.log("data", data);

    const time = new Date(data.startTime as string);

    const newClaimConditionAll = claimConditionAll.map((claimCondition, i) => {
      if (i === id) {
        return {
          quantityLimitPerTransaction:
            data.quantityLimitPerTransaction as string,
          startTime: time as Date,
          price: data.price as string,
          currencyAddress: data.currencyAddress as string,
          maxQuantity: data.maxQuantity as string,
          waitInSeconds: data.waitInSeconds as string,
        };
      }
      return claimCondition;
    });

    setClaimConditionAll(newClaimConditionAll);
    setIsSaved({ ...isSaved, [id]: true });
  };

  const { contract } = useContract(ERC1155_ADDRESS, "edition-drop");
  const {
    data: claimConditions,
    isLoading: isLoadingFetching,
    error: isErrorFetching,
  } = useClaimConditions(contract, targetERC1155);

  // fetching existing datas

  const fetchExistingData = () => {
    const parsedClaimConditions = claimConditions.map((claimCondition, i) => {
      setIsSaved((prev) => {
        return {
          ...prev,
          [i]: true,
        };
      });

      return {
        quantityLimitPerTransaction: claimCondition.quantityLimitPerTransaction,
        startTime: claimCondition.startTime,
        price: (
          claimCondition.price.div(10 ** 6).toNumber() /
          10 ** 12
        ).toString(),
        currencyAddress: claimCondition.currencyAddress,
        maxQuantity: claimCondition.maxQuantity,
        waitInSeconds: claimCondition.waitInSeconds.toString(),
      };
    });
    setClaimConditionAll((prev) =>
      [...parsedClaimConditions, ...prev].slice(0, 5)
    );
  };

  // set claim conditions (blockchain transaction)
  const handleSetClaimConditions = async () => {
    setIsSetting(true);

    let conditionsToSet: ClaimConditionInput[] = [];
    for (let i = 0; i < claimConditionAll.length; i++) {
      if (isSaved[i]) {
        conditionsToSet.push(claimConditionAll[i]);
      }
    }
    console.log("conditionsToSet", conditionsToSet);

    try {
      await contract.claimConditions.set(targetERC1155, conditionsToSet);
    } catch (e) {
      alert("error setting");
    }
    setIsSetting(false);
  };
  const handleDeleteClaimConditions = async () => {
    setIsSetting(true);
    try {
      await contract.claimConditions.set(parseInt(targetERC1155), []);
    } catch (e) {
      alert("error deleting");
    }
    setIsSetting(false);
  };

  // useEffect console.log for debugging
  useEffect(() => {
    console.log("claimConditionAll", claimConditionAll);
  }, [claimConditionAll]);

  // render Inputs
  const RenderInputs = ({ id }: { id: number }) => {
    return (
      <VStack key={id}>
        <form
          ref={(r) => (refs.current[id] = r)}
          onSubmit={(e) => handleSave(e, id)}
        >
          <Text>
            Sale start time (한국시간 기준, ex. 11/21/2022, 12:39:21 PM)
          </Text>
          <Input
            name="startTime"
            type="text"
            defaultValue={claimConditionAll[id]?.startTime?.toLocaleString(
              "en-KR"
            )}
          />

          <Text>Price (ex. 1 = 1ETH) </Text>
          <Input
            name="price"
            type="text"
            defaultValue={claimConditionAll?.[id]?.price}
          />

          <Text>Currency Address</Text>
          <Text fontSize={"xs"}>Test USDT Address: {USDT_ADDRESS}</Text>
          <Text fontSize="xs">
            default: 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
          </Text>
          <Input
            name="currencyAddress"
            type="text"
            defaultValue={claimConditionAll?.[id]?.currencyAddress}
          />
          <Text>Max Quantity - 총 claim 가능한 수량, unlimited = 무한</Text>
          <Input
            name="maxQuantity"
            type="string"
            defaultValue={claimConditionAll?.[id]?.maxQuantity}
          />

          <Text>
            Quantity Limit Per Transaction - 한번 실행에 구매가능 수량,
            unlimited 입력시 무제한
          </Text>
          <Input
            name="quantityLimitPerTransaction"
            type="stirng"
            defaultValue={claimConditionAll?.[id]?.quantityLimitPerTransaction}
          />

          <Text>
            Wait in Seconds - unlimited 입력시, 1회만 구매가능, 0입력시 제한없음
          </Text>
          <Input
            name="waitInSeconds"
            type="string"
            defaultValue={claimConditionAll?.[id]?.waitInSeconds as string}
          />
          <HStack>
            <Button type="submit">Save</Button>
            {isSaved[id] ? <Text>Saved</Text> : <Text>Not Saved</Text>}
          </HStack>
        </form>
      </VStack>
    );
  };

  if (isLoadingFetching || isErrorFetching) {
    return (
      <ModalContent>
        <ModalBody>
          {isLoadingFetching && <Spinner />}
          {isErrorFetching && <Text>error fetching claim condition</Text>}
        </ModalBody>
      </ModalContent>
    );
  }

  return (
    <ModalContent>
      <ModalHeader>Set Claiming Condition for #{targetERC1155}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {claimConditions && claimConditions.length > 0 && (
          <HStack>
            <Text fontWeight={"extrabold"}>
              이미 설정한 값이 있습니다. 수정 또는 삭제 하시겠습니까?
            </Text>
            <Button size="xs" onClick={fetchExistingData}>
              Fetch
            </Button>
          </HStack>
        )}
        <Tabs>
          <TabList>
            <Tab>Claim condition #0</Tab>
            <Tab>Claim condition #1</Tab>
            <Tab>Claim condition #2</Tab>
            <Tab>Claim condition #3</Tab>
            <Tab>Claim condition #4</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <RenderInputs id={0} />
            </TabPanel>

            <TabPanel>
              <RenderInputs id={1} />
            </TabPanel>

            <TabPanel>
              <RenderInputs id={2} />
            </TabPanel>

            <TabPanel>
              <RenderInputs id={3} />
            </TabPanel>

            <TabPanel>
              <RenderInputs id={4} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalBody>

      <ModalFooter>
        <HStack>
          <Button
            colorScheme={"blue"}
            onClick={handleSetClaimConditions}
            isLoading={isSetting}
          >
            Set
          </Button>
          <Button
            colorScheme={"red"}
            onClick={handleDeleteClaimConditions}
            isLoading={isSetting}
          >
            Delete
          </Button>
        </HStack>
      </ModalFooter>
    </ModalContent>
  );
};

export default SetClaimingConditionModal;
