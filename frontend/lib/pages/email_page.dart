import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:frontend/components/my_button.dart';
import 'package:frontend/components/my_textfield.dart';
import 'package:frontend/pages/login_page.dart';
import 'package:frontend/pages/register_page.dart';
import 'package:http/http.dart' as http;

class EmailPage extends StatelessWidget {

  EmailPage({super.key});

  final emailFieldController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            height: double.infinity,
            width: double.infinity,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Colors.purple.shade500,
                  Colors.purple.shade800
                ]
              ),
            ),
            child: const Padding(
              padding: EdgeInsets.only(top: 60.0),
              child: Column(
                children: [
                  Icon(
                    Icons.monetization_on,
                    size: 150,
                    color: Colors.white,
                  ),
                  SizedBox(height: 10,),
                  Text(
                    "33Bank",
                    style: TextStyle(
                      color: Colors.white,
                      fontFamily: "Impact",
                      fontSize: 50,
                    ),
                  ),
                ],
              )
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 320.0),
            child: Container(
              height: double.infinity,
              width: double.infinity,
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(40),
                  topRight: Radius.circular(40)
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'Qual o seu email?',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 30,
                      ),
                    ),
                    const SizedBox(height: 20,),
                    MyTextField(
                      FieldName: "Email",
                      hintText: "name@email.com",
                      icon: Icons.person,
                      obscureText: false,
                      controller: emailFieldController,
                    ),
                    
                    const SizedBox(height: 50,),

                    MyButton(
                      text: "Continue",
                      onTap: () async {
    
                        var response = await http.post(
                          Uri.parse(
                            "http://192.168.0.108:3333/auth/check"
                            ), 
                          body: {
                            'type': "email",
                            'value': emailFieldController.text
                          }
                        );

                        if (response.statusCode == 200) {
                          SystemNavigator.pop();
                        } else {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => RegisterPage()),
                          );
                        }
                      },
                    )
                  ],
                ),
              ),
              
            ),
          ),
        ],
      )
    );
  }

}