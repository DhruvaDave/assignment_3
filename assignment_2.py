

def main():

    input_sentance = [(x) for x in input("Enter multiple value: ").split(" ")] 
    print("Number of list is: ", input_sentance)

    def remove_duplicate(self):
        unique_wrods = []
        for words in input_sentance:
            if words not in unique_wrods:
                unique_wrods.append(words)
        return unique_wrods

    result = remove_duplicate(input_sentance)

    def sort_data(self):
        for i in range(len(result)):
            for j in range(len(result)-1):
                if result[j] > result[j+1]:
                    result[j],result[j+1] = result[j+1],result[j]
        return result

    sorted_data = sort_data(result)

if __name__ == "__main__":
    main()

