export let IconExample = {
    base: `<Icon type={IconType.example} />`
};


export let FormExample = {
    login: `
import React from 'react';
import {Form, InputField, Button} from 'react-ui-modules';

class LoginForm extends Form {

    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleClear() {
        this.clearErrors();
    }

    handleLogin() {
        const {data} = this.state;
        this.clearErrors();

        ExampleAPIService.login(data['email'], data['password'], (error, response) => {

            if (error) {
                this.setErrors(error);
            } else if (response) {
                //Do login
                history.push('/');
            }

        });
    }

    render() {

        const {data, error, hasErrors} = this.state;

        return (
            <div>
                <h1>Login</h1>

                <Alert active={hasErrors} onClose={this.handleClear} title="Oops">
                    Invalid username or password combination, please try again
                </Alert>

                    <div>

                        <InputField name="email"
                                    type="email"
                                    value={data['email']}
                                    error={error['email']}
                                    placeholder="user.name@email.com"
                                    label="Email"
                                    onChange={this.setValue}
                                    autoFocus="true"
                                    data-test-id="login-email"
                        />

                        <InputField name="password"
                                    type="password"
                                    value={data['password']}
                                    error={error['password']}
                                    label="Password"
                                    onChange={this.setValue}
                                    data-test-id="login-password"
                        />

                    </div>

                    <div>
                        <Button onClick={this.handleLogin}>Login</Button>
                    </div>

                </div>
            </div>
        );
    }
}
`
};