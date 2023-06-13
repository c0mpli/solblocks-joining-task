function useWeiToEth() {
  const WeiToEth = (wei) => {
    const ethValue = wei / 10 ** 18; // 1 Ether = 10^18 Wei
    return ethValue.toFixed(10); // Round to 3 decimal places
  };
  return { WeiToEth };
}

export default useWeiToEth;
