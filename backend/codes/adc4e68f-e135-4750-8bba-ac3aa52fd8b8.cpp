#include <iostream>
#include <bits/stdc++.h>

int main() {
    for(int i = 0; i < 6; i++) {
        for(int j = 0; j < 6; j++) { // Changed nested loop variable to 'j'
            std::cout << "Iteration: " << j << std::endl; // Use 'j' in the inner loop
        }
    }
    return 0; // Moved return statement outside the outer loop
}
